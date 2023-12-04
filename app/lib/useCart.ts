import { create } from "zustand";
import type{ ProductId } from "./interface";

interface State{
    cart:ProductId[];
    totalItems:number;
    totalPrice:number;
    showCart:boolean
}
interface Actions {
    addToCart:(Item:ProductId)=> void;
    removeFormCart:(Item:ProductId)=>void;
    toggleShowCart:()=>void
}
export const useCartState = create<State & Actions>((set,get)=>({
    cart:[],
    totalItems:0,
    totalPrice:0,
    showCart:false,
    addToCart:(product:ProductId)=>{
        const cart = get().cart;
        const cartItem = cart.find((item)=>item.slug.current === product.slug.current);
        if(cartItem){
            const updateCart = cart.map(i=> i.slug.current === product.slug.current?
                {...i, quantity:i.quantity+1}:i);
                set(state=>({
                    cart:updateCart,
                    totalPrice:state.totalPrice+product.price,
                    totalItems:state.totalItems + 1
                }));
        }else{
            const updateCart = [...cart,{...product,quantity:1}]
            set(state=>({
                cart:updateCart,
                totalItems:state.totalItems+1,
                totalPrice: state.totalPrice + product.price,
            }))
        }
    },
   
    removeFormCart:(product:ProductId)=>set(state=>({
        cart:state.cart.filter(i=>i.slug.current !== product.slug.current),
        totalItems:state.totalItems-1,
        totalPrice:state.totalPrice-product.price
    })),
    toggleShowCart:()=>set((state)=>({showCart: !state.showCart})),
}));