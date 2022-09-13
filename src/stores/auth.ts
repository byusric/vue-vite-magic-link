import { defineStore } from "pinia";
import { auth, web3, connect } from '../services/magic';
import router from "@/router";
import {address,abi} from "@/services/ppabi";
import axios from 'axios'


const contract = new web3.eth.Contract(abi,address)

export const useAuthStore = defineStore<any, 'auth'>('auth', {
  state: () => ({
    data: undefined,
    address: undefined,
    count: 0,
    balance: 0,
    loading: false,
    access_token: '',
  }),
  actions: {
    async login (email:string|undefined)  {
      // this.loading = true
      // const redirectURI = `${window.location.origin}/`;
      // await auth.auth.loginWithMagicLink({ email });
      // await this.getData()
      // this.loading = false
      // router.push('/')
    },     
    async loginWallet(){
      let address;
      await web3.eth.getAccounts().then((accounts) => {
        address = accounts[0]
      }).catch((error) => {
        console.log(error);
      });
      await axios.post(`${import.meta.env.VITE_API_URL}/login/`,{address}).then(v=>{
        const{data:{access_token}} = v
        this.access_token = access_token
        localStorage.setItem('APP_TOKEN',access_token)
        router.push('/')
      })
    },
    async wallet(){
      connect.connect.showWallet()
    },
    async completeRegister(temp_address:any){
      let address;
      await web3.eth.getAccounts().then((accounts) => {
        address = accounts[0]
      }).catch((error) => {
        console.log(error);
      });
      await axios.post(`${import.meta.env.VITE_API_URL}/complete-register/`,{address,temp_address}).then(v=>{
        const{data:{access_token}} = v
        this.access_token = access_token
        localStorage.setItem('APP_TOKEN',access_token)
        router.push('/')

      })

    },
    async createUser(email:any){
      
      await axios.post(`${import.meta.env.VITE_API_URL}/create-user/`,{email}).then(v=>{
        router.push('/')

      })

    },
    async getData (){
      this.data = await auth.user.getMetadata();

      if(this.data?.publicAddress){
        this.address = this.data.address
        this.balance = await web3.utils.fromWei(await web3.eth.getBalance(this.data?.publicAddress))
      }
    },
    async logout (){
      await connect.connect.disconnect()
      localStorage.removeItem('APP_TOKEN')
      this.data = undefined 
      this.access_token = ''
      router.push({name:'login'})
    },
    async getCount(){
      const res = await contract.methods.getCount().call();
      this.count = res
      return res
     },
    async increment(){
      this.loading = true
      await contract.methods.increment().send({from:(await web3.eth.getAccounts())[0] }).then(async ()=>{
        await this.getCount()
      });
      this.loading = false
    }
  },
});

