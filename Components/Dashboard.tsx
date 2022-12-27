/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import style from "./Dashbord.module.css";
const Dashboard = () => {
  return (
    <div>
      <div className={`${style.dashboardBG} p-3`}>
        <h3 className="bg-primary text-white p-2">
          <Link href="/">Dashboard</Link>
        </h3>
        <div className={`${style.dashboard} d-flex flex-column lh-lg`}>
          {/* --------- dropdown for Create / assign ----------- */}
          <Dropdown className="my-1">
            <Dropdown.Toggle id="dropdown-basic">Create New</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={"/Shop/CreateShop"}>
                Create Shop
              </Dropdown.Item>
              <Dropdown.Item href={"/Home/CreateHome"}>
                Create Home
              </Dropdown.Item>
              <Dropdown.Item href={"/User/CreateUser"}>
                Create User
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link href="/User/ShopOwner">
            <a>List of Shop Owner</a>
          </Link>
          <Link href="/User/HomeOwner">List of Home Owner</Link>
          {/* --------- dropdown for income ----------- */}
          <Dropdown className="my-1">
            <Dropdown.Toggle id="dropdown-basic">
              Payment (Income)
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${style.maxHeightScroll}`}>
              <Dropdown.Item href={"/Payments/ShoshanDevDaho"}>
                Crematorium Dev (Certificate)
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/ShoshanDevShot"}>
                Crematorium Dev (To Burn)
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/Dighi"}>Mere Lease</Dropdown.Item>
              <Dropdown.Item href={"/Payments/DanBox"}>
                Donation Box
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/DanOnudan"}>
                Govt. Donation
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/BuySell"}>
                Shop/Home/Others sell
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/SosanSomadhi"}>
                Cremation grave & Others
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/JinisPotroPrapti"}>
                Receipt of goods
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/CommitteeChada"}>
                Membership subscription
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/ProkashonaProchar"}>
                Publications and Promotions
              </Dropdown.Item>
              <Dropdown.Item href={"/Payments/Bibidh"}>Misc</Dropdown.Item>
              <Dropdown.Item href={"/Payments/Others"}>
                Others (Marriage, Shraddha etc)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* --------- dropdown for spend ----------- */}
          <Dropdown className="mb-1">
            <Dropdown.Toggle id="dropdown-basic">Expense</Dropdown.Toggle>
            <Dropdown.Menu className={`${style.maxHeightScroll}`}>
              <Dropdown.Item href="/Expense/TempDev">
                Temple Development and Reform works
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/FuneralDev">
                Crematorium development
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/EmployeeSalary">
                Salaries and allowances of worker
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/DailyPuja">
                Daily/Weekly Puja
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/Appayon">
                Expenditure on entertainment meeting
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/Prosasonik">
                Administrative and legal expenses
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/ProcharProkashona">
                Expenses for publicity, publications
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/OfficeCost">
                Office stationery
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/SebamulokDan">
                Social welfare works and charitable donations
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/UtilityBill">
                Electricity, gas, telephone and other bills
              </Dropdown.Item>
              <Dropdown.Item href="/Expense/BibidhExpense">Misc</Dropdown.Item>
              <Dropdown.Item href="/Expense/SpecialFunction">
                Special events
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="my-1">
            <Dropdown.Toggle id="dropdown-basic">Report</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={"/Report/Payment"}> Income</Dropdown.Item>
              <Dropdown.Item href={"/Report/Expense"}>Expense</Dropdown.Item>
              <Dropdown.Item href={"/Report/Total"}>Total</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
