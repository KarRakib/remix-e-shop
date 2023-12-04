import { json,type ActionFunctionArgs, redirect } from "@remix-run/node"
import { getDomainUrl, getStripeSession } from "~/lib/stripe.server";

export const action = async ({request}:ActionFunctionArgs)=>{
    if(request.method !== "POST"){
        return json({message:"Method now allowed"}, 405)
    }
    const formData = await request.formData();
    const values = Object.fromEntries(formData)
    const items = values.shoppingData as string;
    const stripeRedirectUrl = await getStripeSession(
        items,
        await getDomainUrl(request)
    );
    return redirect(stripeRedirectUrl)
    
}