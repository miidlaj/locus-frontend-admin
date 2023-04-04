import React from "react";
import walletService from "../../services/wallet.service";

type Transactions = {
    amount: number;
    description: string;
    type: string;
    timestamp: number;
}
type Wallet = {
    balance: number;
    transactions: Transactions[]
}
const WalletPage = () => {

    const [wallet, setWallet] = React.useState<Wallet>()

    React.useEffect(() => {
      walletService.getAdminWalletAndTransactions()
      .then((response) => {
        setWallet(response.data)
      }).catch((error) => {
        console.log(error);
      })
    
    }, [])
    
  return (
    <>
      
<div className="flex-1 px-2 sm:px-0 min-h-screen">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-extralight text-white/50">Wallet</h3>
          <div className="inline-flex items-center space-x-2"></div>
        </div>
        <div
          className="mt-5 relative block overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1592&q=80)] bg-cover bg-center bg-no-repeat"
        >
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative flex items-start justify-between p-4 sm:p-6 lg:p-8">
            <div className="sm:pt-18 pt-12 text-white lg:pt-24">
              <h3 className="text-xl font-bold sm:text-2xl">Balance:</h3>
              <p className="text-sm">₹&nbsp;{wallet?.balance}</p>
            </div>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white">
              {5}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          </div>
        </div>

{
    wallet?.transactions.filter(x => x.type !== "WALLET_CREATED").map((item, index) => (
<div
key={index}
  className="mt-2 relative flex items-start justify-between p-4 shadow-xl sm:p-6 lg:p-8"
>
  <div className="pt-4 text-gray-500">
   
    <h3 className="mt-4 text-lg font-bold text-white/75 sm:text-xl">
      {item.type}
    </h3>
    <p className="mt-2 hidden text-sm sm:block">
      {item.description}
    </p>
  </div>

  {
    item.type === "DEPOSIT" && (
        <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
    +&nbsp;{item.amount}
  </span>
    )
  }

{ 
    item.type === "WITHDRAWAL" && (
        <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-red-600">
    -&nbsp;{item.amount}
  </span>
    )
  }

</div>

    ))
}

        

      </div>
    </>
  );
};

export default WalletPage;
