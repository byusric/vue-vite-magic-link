import { defineStore } from "pinia";
import { auth, web3, connect } from '../services/magic';
import router from "@/router";
import {address,abi} from "@/services/ppabi";

const contract = new web3.eth.Contract(abi,address)

export const useAuthStore = defineStore<any, 'auth'>('auth', {
  state: () => ({
    data: undefined,
    address: undefined,
    count: 0,
    balance: 0,
    loading: false,
  }),
  actions: {
    async login (email:string|undefined)  {
            this.loading = true
      const redirectURI = `${window.location.origin}/`;
      await auth.auth.loginWithMagicLink({ email, redirectURI });
      await this.getData()
      this.loading = false
      router.push('/')
    },     
    async wallet(){
      await web3.eth.getAccounts().then((accounts) => {
        console.log(accounts);
      }).catch((error) => {
        console.log(error);
      });
    },
    async getData (){
      this.data = await auth.user.getMetadata();
      if(this.data?.publicAddress){
        this.address = this.data.address
        this.balance = web3.utils.fromWei(await web3.eth.getBalance(this.data?.publicAddress))
      }
    },

    async logout (){
      await  auth.user.logout();
      this.data = undefined 
      router.push({name:'login'})
    },
    async getCount(){
     const res = await contract.methods.getCount().call();
     console.log(res);
     this.count = res
     return res
    },
    async increment(){
      this.loading = true
      await contract.methods.increment().send({from:(await web3.eth.getAccounts())[0] }).then(()=>{this.getCount()});
      this.loading = false
    }
  },
});

