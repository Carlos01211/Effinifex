import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function CreditCard() {
    
  
;
  
    return (
    
        <Card className="h-[185px] flex flex-col items-center justify-center  bg-blue-700-90	 text-white  font-orbitron rounded-2xl  ">
         <div className="card-content w-[230px] h-[145px] flex flex-col gap-7  ">
         <div className="flex flex-row justify-between ">
         <CardTitle className=" text-[0.50rem]  ">PREMIUM</CardTitle>
         <img className=" w-[38px] "src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrsDN4CdYzmxGhcrZzhpNFYdGfFesb0M5nCSXPGYDGt3cLH3hMlRFPQVevdyTLNyglGqII6XySeAm8X1RwPyabrpnGBAmNxYX27rFbUVMPsfGZEQ4jYqY0c-64_wsm8Jh9pKJhRBTbYQDdfMfRQyD8Piqky_W2JHEPGxCRXcYcCE6YrBECAKJehJ0_/s1600/logo.png" alt=""></img>
        </div>
          <div className="flex flex-col gap-2.5">
            <div>            
            <img className=" w-[28px] "src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFzeQ0hz39haiHkhSOKnHJCG3v6AynORgBKrj0Zf2FTYMvjAsDAxzqIFZ8DYXbyq_-u_kuZcgg5nRpXxVGp18K15NiCGvVwTv-8QUGdZwJS3sSlhRpqEpZ3RHP7vQCIoKYnd6UFEAzxrhFPR5byjFFR6ld7gWvNCD7g5LF3Y6uhJvgY1_hw8qBCqO6/s1600/chip.png" alt=""></img>
            </div>
            <div className="card-number text-xs ">1234 5678 9012 3456</div>
            <div className="card-holder text-[0.55rem]">CARLOS G </div>
            <div className="w-full flex flex-row justify-between text-[0.50rem] ">
           <div className="card-expiry">09/21</div>   
           <div className="card-expiry">16/25</div>     
           </div>  
            </div> 
            </div>             
          </Card>
                     

    );
  }
  
  export default CreditCard;
  