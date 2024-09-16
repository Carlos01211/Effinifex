import Card from "@/Dashboard/FinancialCard";
import Transactions from "@/Transactions/TransactionListManager";
import Graphs from "@/Graphs/Graphs";
import CreditCard from "../rightPanel/CreditCard";
import Memoji from "../rightPanel/memojiAssistant";
import financialGrowth from "@/assets/financialgrowth.svg"
import balance from "@/assets/bankBalance.svg"
import chart from "@/assets/chart-647.svg"





function Dashboard() {
  const username = "newuser";
    return (
      <div className="dashboard  ">
              <Card
          className="card3"
          title="Balance"
          apiUrl="http://localhost:8080/api/total-balance"
          footerText="10% more this month"
          icon={balance}
        />

         <Card
          className="card2"
          title="Income"
          apiUrl="http://localhost:8080/api/total-income"
          footerText="15% more this month"
          icon={financialGrowth}

        />
        <Card
          className="card1"
          title="Expense"
          apiUrl="http://localhost:8080/api/total-expenses"
          username={username}
          footerText="20% more this month"
          icon={chart}

         
        />
        
  
       
        <Transactions  />
        <CreditCard/>

        <Graphs></Graphs>    
        <Memoji/>
         
        
  


           

      

      </div>
    );
  }

  export default Dashboard;
  