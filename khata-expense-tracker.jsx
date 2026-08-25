import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import {
  LayoutDashboard, Receipt, BarChart3, Tags, Plus, X, Check, Trash2, Pencil,
  Download, Upload, Calendar, IndianRupee, RotateCcw, Settings, Search,
  AlertCircle, Utensils, ShoppingCart, Bus, ShoppingBag, Zap, Film, HeartPulse,
  Plane, GraduationCap, Home, PiggyBank, MoreHorizontal, Inbox, Wallet,
  ArrowRightLeft, Users, RefreshCcw, Building2, Banknote,
  ChevronRight, Clock, TrendingDown, ArrowUpRight, ArrowDownLeft,
  FolderCheck, Phone, Info
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* Constants & helpers                                                     */
/* ---------------------------------------------------------------------- */

const ICONS = {
  Utensils, ShoppingCart, Bus, ShoppingBag, Zap, Film, HeartPulse, Plane,
  GraduationCap, Home, PiggyBank, MoreHorizontal, Wallet, Receipt,
};
const ICON_CHOICES = [
  "Utensils","ShoppingCart","Bus","ShoppingBag","Zap","Film",
  "HeartPulse","Plane","GraduationCap","Home","PiggyBank","MoreHorizontal","Wallet","Receipt",
];
const COLOR_CHOICES = [
  "#A63A2E","#5F7A3D","#33608A","#8A5A3E","#A9792A","#734279",
  "#B0413E","#2A6B78","#3E4F7A","#6B4A2A","#2F6B4F","#6B6B5A","#914E3C","#3D6B5C",
];
const ACCOUNT_COLORS = [
  "#33608A","#5F7A3D","#734279","#A9792A","#2A6B78","#6B2737","#3E4F7A","#914E3C",
];
const DEFAULT_CATEGORIES = [
  { id:"food", name:"Food", icon:"Utensils", color:"#A63A2E", budget:0, type:"expense" },
  { id:"temple", name:"Temple", icon:"Home", color:"#A9792A", budget:0, type:"expense" },
  { id:"petrol", name:"Petrol", icon:"Bus", color:"#8A5A3E", budget:0, type:"expense" },
  { id:"rent", name:"Rent", icon:"Home", color:"#6B4A2A", budget:0, type:"expense" },
  { id:"groceries", name:"Groceries", icon:"ShoppingCart", color:"#5F7A3D", budget:0, type:"expense" },
  { id:"transport", name:"Transport", icon:"Bus", color:"#33608A", budget:0, type:"expense" },
  { id:"shopping", name:"Shopping", icon:"ShoppingBag", color:"#8A5A3E", budget:0, type:"expense" },
  { id:"bills", name:"Bills & Utilities", icon:"Zap", color:"#A9792A", budget:0, type:"expense" },
  { id:"entertainment", name:"Entertainment", icon:"Film", color:"#734279", budget:0, type:"expense" },
  { id:"health", name:"Health", icon:"HeartPulse", color:"#B0413E", budget:0, type:"expense" },
  { id:"travel", name:"Travel", icon:"Plane", color:"#2A6B78", budget:0, type:"expense" },
  { id:"education", name:"Education", icon:"GraduationCap", color:"#3E4F7A", budget:0, type:"expense" },
  { id:"investments", name:"Investments", icon:"PiggyBank", color:"#2F6B4F", budget:0, type:"expense" },
  { id:"recharge", name:"Recharge", icon:"Zap", color:"#33608A", budget:0, type:"expense" },
  { id:"internet", name:"Internet", icon:"Zap", color:"#2A6B78", budget:0, type:"expense" },
  { id:"home", name:"Home", icon:"Home", color:"#6B6B5A", budget:0, type:"expense" },
  { id:"transfer", name:"Transfer", icon:"ArrowRightLeft", color:"#3E4F7A", budget:0, type:"expense" },
  { id:"withdrawal", name:"Withdrawal", icon:"Wallet", color:"#914E3C", budget:0, type:"expense" },
  { id:"medical", name:"Medical", icon:"HeartPulse", color:"#B0413E", budget:0, type:"expense" },
  { id:"gym", name:"Gym", icon:"HeartPulse", color:"#3D6B5C", budget:0, type:"expense" },
  { id:"emi", name:"EMI", icon:"Receipt", color:"#A63A2E", budget:0, type:"expense" },
  { id:"taxes", name:"Taxes", icon:"Receipt", color:"#6B4A2A", budget:0, type:"expense" },
  { id:"insurance", name:"Insurance", icon:"HeartPulse", color:"#2A6B78", budget:0, type:"expense" },
  { id:"selfcare", name:"Self Care", icon:"HeartPulse", color:"#B0413E", budget:0, type:"expense" },
  { id:"gifts", name:"Gifts & Donations", icon:"HeartPulse", color:"#B0413E", budget:0, type:"expense" },
  { id:"domestic_help", name:"Domestic Help", icon:"Home", color:"#8A5A3E", budget:0, type:"expense" },
  { id:"vehicle_maint", name:"Vehicle Maintenance", icon:"Bus", color:"#6B6B5A", budget:0, type:"expense" },
  { id:"pets", name:"Pets", icon:"HeartPulse", color:"#A9792A", budget:0, type:"expense" },
  { id:"childcare", name:"Childcare", icon:"GraduationCap", color:"#3E4F7A", budget:0, type:"expense" },
  { id:"office", name:"Office & Work", icon:"Wallet", color:"#33608A", budget:0, type:"expense" },
  { id:"subscriptions", name:"Subscriptions", icon:"Zap", color:"#734279", budget:0, type:"expense" },
  { id:"misc", name:"Misc", icon:"MoreHorizontal", color:"#6B6B5A", budget:0, type:"expense" },
];

const DEFAULT_INCOME_CATEGORIES = [
  { id: "inc_salary", name: "Salary", icon: "Wallet", color: "#2F6B4F", budget: 0, type: "income" },
  { id: "inc_rent", name: "Rental Income", icon: "Home", color: "#6B4A2A", budget: 0, type: "income" },
  { id: "inc_interest", name: "Interest & Dividends", icon: "PiggyBank", color: "#2A6B78", budget: 0, type: "income" },
  { id: "inc_freelance", name: "Freelance & Side Hustle", icon: "GraduationCap", color: "#3E4F7A", budget: 0, type: "income" },
  { id: "inc_cashback", name: "Cashback", icon: "Receipt", color: "#5F7A3D", budget: 0, type: "income" },
  { id: "inc_bonus", name: "Bonus", icon: "PiggyBank", color: "#734279", budget: 0, type: "income" },
  { id: "inc_gift", name: "Gift", icon: "HeartPulse", color: "#A9792A", budget: 0, type: "income" },
  { id: "inc_refund", name: "Refundable Amt Refund", icon: "RotateCcw", color: "#2A6B78", budget: 0, type: "income" },
  { id: "inc_other", name: "Other", icon: "MoreHorizontal", color: "#6B6B5A", budget: 0, type: "income" },
];
const DEFAULT_ACCOUNTS = [
  { id:"acc_bank1", name:"SBI Savings", type:"bank", color:"#33608A", openingBalance:0, openingDate: todayStr() },
  { id:"acc_bank2", name:"HDFC Bank", type:"bank", color:"#5F7A3D", openingBalance:0, openingDate: todayStr() },
  { id:"acc_bank3", name:"Axis Bank", type:"bank", color:"#734279", openingBalance:0, openingDate: todayStr() },
  { id:"acc_cash", name:"Cash", type:"cash", color:"#A9792A", openingBalance:0, openingDate: todayStr() },
];
const PAYMENT_METHODS = ["Cash","Debit Card","Credit Card","UPI","Net Banking","Wallet","Other"];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const FY_MONTH_ORDER = [3,4,5,6,7,8,9,10,11,0,1,2];
const RELATION_OPTIONS = ["Spouse","Father","Mother","Son","Daughter","Brother","Sister","Friend","Other"];

/* ---------------------------------------------------------------------- */
/* Date helpers                                                            */
/* ---------------------------------------------------------------------- */

function pad2(n) { return String(n).padStart(2,"0"); }
function toDateStr(d) { return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; }
function todayStr() { return toDateStr(new Date()); }
function parseDateStr(s) { const [y,m,d]=s.split("-").map(Number); return new Date(y,m-1,d); }
function fmtINR(n) {
  const num=Number(n)||0;
  return "\u20B9"+num.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2});
}
function fmtINRCompact(n) {
  return fmtINR(n);
}
function fmtDateDisplay(s) {
  const d=parseDateStr(s);
  return `${pad2(d.getDate())} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}
function startOfMonth(d) { return new Date(d.getFullYear(),d.getMonth(),1); }
function endOfMonth(d) { return new Date(d.getFullYear(),d.getMonth()+1,0); }
function startOfYear(d) { return new Date(d.getFullYear(),0,1); }
function endOfYear(d) { return new Date(d.getFullYear(),11,31); }
function fyStartYear(d) { return d.getMonth()>=3?d.getFullYear():d.getFullYear()-1; }
function fyRange(sy) { return {start:new Date(sy,3,1),end:new Date(sy+1,2,31)}; }
function fyLabel(sy) { return `FY ${sy}-${String(sy+1).slice(-2)}`; }
function inRange(d,s,e) { return d>=s&&d<=e; }
function generateId(pfx="id") { return `${pfx}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`; }
function daysBetween(a,b) { return Math.round((b-a)/86400000); }
function addDays(d,n) { const r=new Date(d); r.setDate(r.getDate()+n); return r; }

function getPeriodRange(preset,custom) {
  const today=new Date();
  switch(preset){
    case "today": return {start:today,end:today,label:"Today",granularity:"day"};
    case "thisMonth": return {start:startOfMonth(today),end:endOfMonth(today),label:`${MONTH_NAMES[today.getMonth()]} ${today.getFullYear()}`,granularity:"day"};
    case "lastMonth":{const lm=new Date(today.getFullYear(),today.getMonth()-1,1);return{start:startOfMonth(lm),end:endOfMonth(lm),label:`${MONTH_NAMES[lm.getMonth()]} ${lm.getFullYear()}`,granularity:"day"};}
    case "thisYear": return {start:startOfYear(today),end:endOfYear(today),label:`${today.getFullYear()} (Calendar Year)`,granularity:"month"};
    case "thisFY":{const sy=fyStartYear(today);const{start,end}=fyRange(sy);return{start,end,label:fyLabel(sy),granularity:"month",fyStart:sy};}
    case "lastFY":{const sy=fyStartYear(today)-1;const{start,end}=fyRange(sy);return{start,end,label:fyLabel(sy),granularity:"month",fyStart:sy};}
    case "specificMonth":{
      const d = custom?.specificMonth ? parseDateStr(custom.specificMonth + "-01") : today;
      return {start:startOfMonth(d),end:endOfMonth(d),label:`${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`,granularity:"day"};
    }
    case "custom":{
      const start=custom?.start?parseDateStr(custom.start):startOfMonth(today);
      const end=custom?.end?parseDateStr(custom.end):today;
      const gran=daysBetween(start,end)<=31?"day":"month";
      return{start,end,label:`${toDateStr(start)} \u2192 ${toDateStr(end)}`,granularity:gran};
    }
    default: return{start:startOfMonth(today),end:endOfMonth(today),label:"This Month",granularity:"day"};
  }
}

/* ---------------------------------------------------------------------- */
/* API storage client                                                      */
/* ---------------------------------------------------------------------- */

const apiStorage = {
  async read(key) {
    try {
      const res = await fetch(`/api/storage/${key}`);
      const data = await res.json();
      return data.value;
    } catch (e) {
      console.error("API read failed, using localStorage fallback", e);
      try {
        const v = localStorage.getItem(`khata_${key}`);
        return v ? JSON.parse(v) : null;
      } catch (_) { return null; }
    }
  },
  async write(key, data) {
    try {
      await fetch(`/api/storage/${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
    } catch (e) {
      console.error("API write failed, using localStorage fallback", e);
    }
    try { localStorage.setItem(`khata_${key}`, JSON.stringify(data)); } catch (_) {}
  }
};

/* ---------------------------------------------------------------------- */
/* Balance engine                                                          */
/* ---------------------------------------------------------------------- */

function balanceAtDate(accId, targetDate, accounts, expenses, transfers) {
  const acc = accounts.find(a=>a.id===accId);
  if (!acc) return 0;
  const od = acc.openingDate ? parseDateStr(acc.openingDate) : new Date(0);
  const target = typeof targetDate==="string" ? parseDateStr(targetDate) : targetDate;
  let bal = Number(acc.openingBalance)||0;
  expenses.forEach(e=>{
    if (e.accountId!==accId) return;
    const d=parseDateStr(e.date);
    if (d>=od && d<=target) {
      const amt = Number(e.amount)||0;
      if (e.entryType === "income") {
        bal += amt;
      } else {
        bal -= amt;
      }
    }
  });
  transfers.forEach(t=>{
    const d=parseDateStr(t.date);
    const amt=Number(t.amount||0);
    if (d>=od && d<=target) {
      if (t.type==="internal"){
        if(t.fromAccountId===accId) bal-=amt;
        if(t.toAccountId===accId) bal+=amt;
      } else if (t.type==="family"){
        if(t.fromAccountId===accId) bal-=amt;
        if(t.toAccountId===accId) bal+=amt;
      } else if (t.type==="refundable" && t.fromAccountId===accId){
        bal-=amt;
      } else if (t.type==="liability"&&t.toAccountId===accId){
        bal+=amt;
        bal-=Number(t.spentAmount)||0;
      }
    }
    if (t.type==="liability" && t.history && t.history.length > 0) {
      t.history.forEach(h => {
        const hd = parseDateStr(h.date);
        if (hd>=od && hd<=target) {
          if (h.type === "added" && h.accountId === accId) bal += Number(h.amount);
          if (h.type === "spent" && h.accountId === accId) bal -= Number(h.amount);
        }
      });
    }
    if (t.type==="refundable" && t.status==="refunded" && t.refundMode!=="other") {
       const rd = t.refundDate ? parseDateStr(t.refundDate) : d;
       if (rd>=od && rd<=target) {
         if ((!t.refundAccountId || t.refundAccountId===accId) && t.fromAccountId===accId) {
            bal+=Number(t.refundedAmount)||0;
         }
         if (t.refundAccountId===accId && t.fromAccountId!==accId) {
            bal+=Number(t.refundedAmount)||0;
         }
       }
    }
  });
  return bal;
}

function periodBalance(accId, periodStart, periodEnd, accounts, expenses, transfers) {
  const acc = accounts.find(a=>a.id===accId);
  if (!acc) return {opening:0,closing:0,netChange:0,income:0,expense:0,transfer:0};
  const od = acc.openingDate ? parseDateStr(acc.openingDate) : new Date(0);
  const start = typeof periodStart==="string"?parseDateStr(periodStart):periodStart;
  const end   = typeof periodEnd==="string"?parseDateStr(periodEnd):periodEnd;
  const dayBefore = addDays(start,-1);
  let opening;
  if (start<=od) {
    opening = Number(acc.openingBalance)||0;
  } else {
    opening = balanceAtDate(accId,dayBefore,accounts,expenses,transfers);
  }
  const closing = balanceAtDate(accId,end,accounts,expenses,transfers);
  
  let income=0, expense=0, transfer=0;
  expenses.forEach(e=>{
    if(e.accountId!==accId) return;
    const d=parseDateStr(e.date);
    if(d>=start && d<=end) {
      if(e.entryType==="income") income+=Number(e.amount||0);
      else expense+=Number(e.amount||0);
    }
  });
  
  transfers.forEach(t=>{
    const d=parseDateStr(t.date);
    const amt=Number(t.amount||0);
    if(d>=start && d<=end) {
      if (t.type==="internal"){
        if(t.fromAccountId===accId) transfer-=amt;
        if(t.toAccountId===accId) transfer+=amt;
      } else if (t.type==="family"){
        if(t.fromAccountId===accId) transfer-=amt;
        if(t.toAccountId===accId) transfer+=amt;
      } else if (t.type==="refundable" && t.fromAccountId===accId){
        transfer-=amt;
      } else if (t.type==="liability"&&t.toAccountId===accId){
        transfer+=amt;
        transfer-=Number(t.spentAmount)||0;
      }
    }
    if (t.type==="liability" && t.history && t.history.length > 0) {
      t.history.forEach(h => {
        const hd = parseDateStr(h.date);
        if (hd>=start && hd<=end) {
          if (h.type === "added" && h.accountId === accId) transfer += Number(h.amount);
          if (h.type === "spent" && h.accountId === accId) transfer -= Number(h.amount);
        }
      });
    }
    if (t.type==="refundable" && t.status==="refunded" && t.refundMode!=="other") {
       const rd = t.refundDate ? parseDateStr(t.refundDate) : d;
       if (rd>=start && rd<=end) {
         if ((!t.refundAccountId || t.refundAccountId===accId) && t.fromAccountId===accId) {
            transfer += Number(t.refundedAmount)||0;
         }
         if (t.refundAccountId===accId && t.fromAccountId!==accId) {
            transfer += Number(t.refundedAmount)||0;
         }
       }
    }
  });

  return {opening,closing,netChange:closing-opening,income,expense,transfer};
}

function currentBalance(accId, accounts, expenses, transfers) {
  return balanceAtDate(accId, new Date(), accounts, expenses, transfers);
}

function totalNetWorth(accounts, expenses, transfers) {
  return accounts.reduce((s,a)=>s+currentBalance(a.id,accounts,expenses,transfers),0);
}

/* ---------------------------------------------------------------------- */
/* Small UI components                                                     */
/* ---------------------------------------------------------------------- */

function CategoryIcon({icon,color,size=16}){const Ico=ICONS[icon]||MoreHorizontal;return<Ico size={size} color={color} strokeWidth={2}/>;}
function AccIcon({type,size=16,color}){if(type==="cash")return<Banknote size={size}color={color||"#A9792A"}strokeWidth={2}/>;return<Building2 size={size}color={color||"#33608A"}strokeWidth={2}/>;}

function StatCard({label,value,icon,tint,sub}){
  return(
    <div className="et-card et-stat-card">
      <div className="et-stat-top">
        <span className="et-stat-label">{label}</span>
        <span className="et-stat-icon"style={{color:tint}}>{icon}</span>
      </div>
      <div className="et-stat-value et-font-mono">{fmtINR(value)}</div>
      {sub&&<div className="et-stat-sub">{sub}</div>}
    </div>
  );
}

function EmptyState({text,sub}){
  return(
    <div className="et-empty">
      <Inbox size={30}strokeWidth={1.5}color="#8a8574"/>
      <div className="et-empty-text">{text}</div>
      {sub&&<div className="et-empty-sub">{sub}</div>}
    </div>
  );
}

function Toast({toast}){
  if(!toast)return null;
  return(
    <div className="et-toast et-fade-in">
      <Check size={15}/><span>{toast}</span>
    </div>
  );
}

function TransferBadge({type}){
  const map={
    internal:{cls:"et-badge-internal",icon:<ArrowRightLeft size={10}/>,label:"Transfer"},
    family:{cls:"et-badge-family",icon:<Users size={10}/>,label:"Family"},
    refundable:{cls:"et-badge-refund",icon:<RefreshCcw size={10}/>,label:"Refundable"},
    liability:{cls:"et-badge-refund",icon:<Download size={10}/>,label:"Liability"},
  };
  const m=map[type]||map.internal;
  return<span className={`et-badge ${m.cls}`}>{m.icon}{m.label}</span>;
}

function BalanceBlock({label,value,size="md"}){
  const cls=value<0?"et-amt-debit":"et-amt-credit";
  return(
    <div className="et-bal-block">
      <div className="et-bal-label">{label}</div>
      <div className={`et-bal-value et-font-mono ${cls} ${size==="lg"?"et-bal-lg":""}`}>
        {fmtINR(value)}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Main App                                                                */
/* ---------------------------------------------------------------------- */

export default function ExpenseTracker(){
  const [loading,setLoading]=useState(true);

  const [expenses,setExpenses]=useState([]);
  const [categories,setCategories]=useState(DEFAULT_CATEGORIES);
  const [accounts,setAccounts]=useState(DEFAULT_ACCOUNTS);
  const [transfers,setTransfers]=useState([]);
  const [familyMembers,setFamilyMembers]=useState([]);

  const [tab,setTab]=useState("dashboard");
  const [showForm,setShowForm]=useState(false);
  const [editingExpense,setEditingExpense]=useState(null);
  const [showTransferModal,setShowTransferModal]=useState(false);
  const [editingTransfer,setEditingTransfer]=useState(null);
  const [toast,setToast]=useState(null);
  const [confirmResetOpen,setConfirmResetOpen]=useState(false);
  const [confirmDeleteId,setConfirmDeleteId]=useState(null);
  const [selectedAccountId,setSelectedAccountId]=useState(null);

  // Transactions filters
  const [txSearch,setTxSearch]=useState("");
  const [txCategory,setTxCategory]=useState("all");
  const [txPreset,setTxPreset]=useState("thisMonth");
  const [txCustomStart,setTxCustomStart]=useState("");
  const [txCustomEnd,setTxCustomEnd]=useState("");
  const [txSpecificMonth,setTxSpecificMonth]=useState(todayStr().substring(0,7));
  const [txSort,setTxSort]=useState("date_desc");
  const [txAccount,setTxAccount]=useState("all");

  // Reports
  const [repPreset,setRepPreset]=useState("thisMonth");
  const [repCustomStart,setRepCustomStart]=useState("");
  const [repCustomEnd,setRepCustomEnd]=useState("");
  const [repSpecificMonth,setRepSpecificMonth]=useState(todayStr().substring(0,7));
  const [repType,setRepType]=useState("expense");

  /* -- fonts -- */
  useEffect(()=>{
    const l=document.createElement("link");
    l.rel="stylesheet";
    l.href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,450;9..144,560;9..144,650&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
    return()=>{document.head.removeChild(l);};
  },[]);

  /* -- load data -- */
  useEffect(()=>{
    (async()=>{
      const cats=await apiStorage.read("categories");
      if(cats) {
        let upgraded = cats.map(c=>({...c, type: c.type || "expense"}));
        
        // Normalize names for comparison (lowercases, strips hyphens/underscores/extra spaces)
        const normalize = n => n.toLowerCase().replace(/[-_\s]+/g, " ").trim();

        // 1. Standardize casing and spelling based on default categories
        upgraded = upgraded.map(c => {
          const matchingDefault = [...DEFAULT_CATEGORIES, ...DEFAULT_INCOME_CATEGORIES]
            .find(d => normalize(d.name) === normalize(c.name) && d.type === c.type);
          if (matchingDefault) {
            return { ...c, name: matchingDefault.name };
          }
          return c;
        });

        // 2. Filter out legacy obsolete categories
        upgraded = upgraded.filter(c => {
          const normName = normalize(c.name);
          if (normName === "others" || normName === "others savings" || normName === "investments savings" || normName === "food dining" || normName === "rent housing") {
            return false;
          }
          return true;
        });

        // 3. Deduplicate matching names (case & character insensitive)
        const seen = new Set();
        upgraded = upgraded.filter(c => {
          const key = `${normalize(c.name)}_${c.type}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        // 4. Merge missing default expense categories
        DEFAULT_CATEGORIES.forEach(defCat => {
          if (!upgraded.some(c => normalize(c.name) === normalize(defCat.name) && c.type === "expense")) {
            upgraded.push(defCat);
          }
        });
        // Merge missing default income categories
        DEFAULT_INCOME_CATEGORIES.forEach(defCat => {
          if (!upgraded.some(c => normalize(c.name) === normalize(defCat.name) && c.type === "income")) {
            upgraded.push(defCat);
          }
        });

        // 5. Order expense categories: Food, Temple, Petrol, Rent first
        const expenseCats = upgraded.filter(c => c.type !== "income");
        const incomeCats = upgraded.filter(c => c.type === "income");

        const targetOrder = ["food", "temple", "petrol", "rent"];
        const orderedExpense = [];
        targetOrder.forEach(name => {
          const found = expenseCats.find(c => c.name.toLowerCase() === name);
          if (found) orderedExpense.push(found);
        });
        expenseCats.forEach(c => {
          if (!targetOrder.includes(c.name.toLowerCase())) {
            orderedExpense.push(c);
          }
        });

        upgraded = [...orderedExpense, ...incomeCats];

        await apiStorage.write("categories", upgraded);
        setCategories(upgraded);
      }
      else {
        const initialCats = [
          ...DEFAULT_CATEGORIES,
          ...DEFAULT_INCOME_CATEGORIES
        ];
        await apiStorage.write("categories", initialCats);
        setCategories(initialCats);
      }

      const exps=await apiStorage.read("expenses");
      if(exps) setExpenses(exps);
      else await apiStorage.write("expenses",[]);

      const accs=await apiStorage.read("accounts");
      if(accs) setAccounts(accs);
      else await apiStorage.write("accounts",DEFAULT_ACCOUNTS);

      const txfs=await apiStorage.read("transfers");
      if(txfs) setTransfers(txfs);
      else await apiStorage.write("transfers",[]);

      const fams=await apiStorage.read("familyMembers");
      if(fams) setFamilyMembers(fams);
      else await apiStorage.write("familyMembers",[]);

      setLoading(false);
    })();
  },[]);

  function showToast(msg){setToast(msg);setTimeout(()=>setToast(null),2400);}

  async function persist(key,setter,next){
    setter(next);
    await apiStorage.write(key,next);
  }

  const persistExpenses   = n=>persist("expenses",   setExpenses,   n);
  const persistCategories = n=>persist("categories", setCategories, n);
  const persistAccounts   = n=>persist("accounts",   setAccounts,   n);
  const persistTransfers  = n=>persist("transfers",  setTransfers,  n);
  const persistFamily     = n=>persist("familyMembers",setFamilyMembers,n);

  /* -- CRUD -- */
  const saveExpense=useCallback((payload)=>{
    if(payload.id){
      persistExpenses(expenses.map(e=>e.id===payload.id?payload:e));
      showToast("Entry updated");
    } else {
      persistExpenses([{...payload,id:generateId("exp")},...expenses]);
      showToast("Entry recorded");
    }
    setShowForm(false);setEditingExpense(null);
  },[expenses]);

  function deleteExpense(id){persistExpenses(expenses.filter(e=>e.id!==id));setConfirmDeleteId(null);showToast("Deleted");}

  function saveTransfer(payload){
    if(payload.id){
      persistTransfers(transfers.map(t=>t.id===payload.id?payload:t));
      showToast("Transfer updated");
    } else {
      persistTransfers([{...payload,id:generateId("txf")},...transfers]);
      showToast("Transfer recorded");
    }
    setShowTransferModal(false);setEditingTransfer(null);
  }
  function deleteTransfer(id){persistTransfers(transfers.filter(t=>t.id!==id));showToast("Transfer deleted");}
  function markRefunded(id,amount,date,mode,accountId,note){
    persistTransfers(transfers.map(t=>
      t.id===id?{
        ...t,
        refundedAmount:Number(amount)||t.amount,
        refundDate:date||todayStr(),
        refundMode:mode||"money",
        refundAccountId:mode==="money"?accountId:null,
        refundNote:note||"",
        status:"refunded"
      }:t
    ));
    showToast("Marked as refunded");
  }
  function writeOffRefundable(id){
    persistTransfers(transfers.map(t=>
      t.id===id?{...t,status:"written_off"}:t
    ));
    showToast("Refund written off / relieved");
  }
  function updateLiability(id, additionalSpent, markSettled, spentNote, addedFunds, addedFundsNote, actionAccountId, actionDate){
    persistTransfers(transfers.map(t=>{
      if(t.id!==id) return t;
      let newNote = t.note || "";
      if (additionalSpent) {
        newNote = newNote ? `${newNote} | Spent (₹${additionalSpent}): ${spentNote||"No reason"}` : `Spent (₹${additionalSpent}): ${spentNote||"No reason"}`;
      }
      if (addedFunds) {
        newNote = newNote ? `${newNote} | Added (₹${addedFunds}): ${addedFundsNote||"No reason"}` : `Added (₹${addedFunds}): ${addedFundsNote||"No reason"}`;
      }
      const newHistory = [...(t.history||[])];
      if (additionalSpent && Number(additionalSpent) > 0) {
        newHistory.push({ id: generateId("lh"), type: "spent", amount: Number(additionalSpent), accountId: actionAccountId, date: actionDate || todayStr(), note: spentNote || "" });
      }
      if (addedFunds && Number(addedFunds) > 0) {
        newHistory.push({ id: generateId("lh"), type: "added", amount: Number(addedFunds), accountId: actionAccountId, date: actionDate || todayStr(), note: addedFundsNote || "" });
      }
      return {...t, status: markSettled ? "settled" : "pending", note: newNote, history: newHistory};
    }));
    showToast("Liability updated");
  }

  function saveAccount(payload){
    if(payload.id&&accounts.find(a=>a.id===payload.id)){
      persistAccounts(accounts.map(a=>a.id===payload.id?payload:a));showToast("Account updated");
    } else {
      persistAccounts([...accounts,{...payload,id:generateId("acc")}]);showToast("Account added");
    }
  }
  function deleteAccount(id){persistAccounts(accounts.filter(a=>a.id!==id));showToast("Account removed");}

  function saveFamilyMember(payload){
    if(payload.id&&familyMembers.find(f=>f.id===payload.id)){
      persistFamily(familyMembers.map(f=>f.id===payload.id?payload:f));showToast("Updated");
    } else {
      persistFamily([...familyMembers,{...payload,id:generateId("fam")}]);showToast("Member added");
    }
  }
  function deleteFamilyMember(id){persistFamily(familyMembers.filter(f=>f.id!==id));showToast("Member removed");}

  function addCategory(cat){persistCategories([...categories,{...cat,id:`cat_${Date.now()}`}]);showToast("Category added");}
  function updateCategoryBudget(id,budget){persistCategories(categories.map(c=>c.id===id?{...c,budget}:c));}
  function deleteCategory(id){persistCategories(categories.filter(c=>c.id!==id));showToast("Category removed");}
  function resetAllExpenses(){persistExpenses([]);setConfirmResetOpen(false);showToast("All entries cleared");}

  function exportBackupJSON(){
    const blob=new Blob([JSON.stringify({expenses,categories,accounts,transfers,familyMembers,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`khata-backup-${todayStr()}.json`;a.click();URL.revokeObjectURL(url);
  }
  function importBackupJSON(file){
    const reader=new FileReader();
    reader.onload=()=>{
      try{
        const p=JSON.parse(reader.result);
        if(p.expenses) persistExpenses(p.expenses);
        if(p.categories) persistCategories(p.categories);
        if(p.accounts) persistAccounts(p.accounts);
        if(p.transfers) persistTransfers(p.transfers);
        if(p.familyMembers) persistFamily(p.familyMembers);
        showToast("Backup restored");
      }catch(_){showToast("Could not read file");}
    };reader.readAsText(file);
  }
  function exportCSV(rows,filename){
    const hdr="Date,Category,Amount,Account,Method,Note";
    const lines=rows.map(r=>{
      const acc=accounts.find(a=>a.id===r.accountId);
      const note=(r.note||"").replace(/"/g,'""');
      return`${r.date},"${r.category}",${r.amount},"${acc?acc.name:""}","${r.method}","${note}"`;
    });
    const csv="\uFEFF"+[hdr,...lines].join("\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
  }

  function exportTransfersCSV(){
    const hdr="Date,Type,Amount,From,To,Note";
    const lines=transfers.map(t=>{
      const fromAcc = accounts.find(a=>a.id===t.fromAccountId);
      const toAcc = accounts.find(a=>a.id===t.toAccountId);
      const note = (t.note||"").replace(/"/g,'""');
      return`${t.date},"${t.type}",${t.amount},"${fromAcc?fromAcc.name:""}","${toAcc?toAcc.name:""}","${note}"`;
    });
    const csv="\uFEFF"+[hdr,...lines].join("\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`khata-transfers-${todayStr()}.csv`;a.click();URL.revokeObjectURL(url);
  }

  function handleCSVImport(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split("\n");
        const newExps = [];
        
        for (let i = 1; i < lines.length; i++) {
          let line = lines[i].trim();
          if (!line) continue;
          
          let p = [];
          let cur = "", inQuotes = false;
          for (let c=0; c<line.length; c++) {
            if (line[c] === '"') inQuotes = !inQuotes;
            else if (line[c] === ',' && !inQuotes) { p.push(cur); cur = ""; }
            else cur += line[c];
          }
          p.push(cur);
          
          const date = p[0] || todayStr();
          const category = p[1] || "Misc";
          const amount = parseFloat(p[2]) || 0;
          const accName = p[3] || "";
          const note = p[5] || "";
          
          if (amount > 0) {
             const acc = accounts.find(a=>a.name===accName);
             newExps.push({
               id: generateId("exp"),
               entryType: "expense",
               date,
               amount,
               category,
               note,
               method: "—",
               accountId: acc ? acc.id : undefined
             });
          }
        }
        
        if (newExps.length > 0) {
          persistExpenses([...newExps, ...expenses]);
          showToast(`Imported ${newExps.length} transactions`);
        } else {
          showToast("No transactions found");
        }
      } catch (err) {
        showToast("Invalid CSV format");
      }
    };
    reader.readAsText(file);
  }

  /* -- Derived / memoized -- */
  const balMap=useMemo(()=>{
    const m={};
    accounts.forEach(a=>{m[a.id]=currentBalance(a.id,accounts,expenses,transfers);});
    return m;
  },[accounts,expenses,transfers]);

  const netWorth=useMemo(()=>totalNetWorth(accounts,expenses,transfers),[accounts,expenses,transfers]);
  const pendingRefunds=useMemo(()=>transfers.filter(t=>t.type==="refundable"&&t.status==="pending"),[transfers]);

  const catByName=useMemo(()=>{const m={};categories.forEach(c=>{m[c.name]=c;});return m;},[categories]);
  const accById=useMemo(()=>{const m={};accounts.forEach(a=>{m[a.id]=a;});return m;},[accounts]);
  const famById=useMemo(()=>{const m={};familyMembers.forEach(f=>{m[f.id]=f;});return m;},[familyMembers]);

  /* -- Dashboard data -- */
  const dash=useMemo(()=>{
    const today=new Date(),todayS=todayStr();
    const som=startOfMonth(today),eom=endOfMonth(today);
    const sy=fyStartYear(today),{start:fyS,end:fyE}=fyRange(sy);
    const yearS=startOfYear(today),yearE=endOfYear(today);
    let todayTotal=0,monthTotal=0,fyTotal=0,yearTotal=0;
    let monthIncome=0,monthExpense=0;
    const monthCatMap={};
    expenses.forEach(e=>{
      const d=parseDateStr(e.date),amt=Number(e.amount)||0;
      const isInc = e.entryType === "income";

      if(e.date===todayS && !isInc) todayTotal+=amt;
      if(inRange(d,som,eom)){
        if (isInc) {
          monthIncome += amt;
        } else {
          monthExpense += amt;
          monthTotal += amt;
          monthCatMap[e.category]=(monthCatMap[e.category]||0)+amt;
        }
      }
      if(inRange(d,fyS,fyE) && !isInc) fyTotal+=amt;
      if(inRange(d,yearS,yearE) && !isInc) yearTotal+=amt;
    });
    const monthCatData=Object.entries(monthCatMap)
      .map(([name,value])=>({name,value,color:(catByName[name]&&catByName[name].color)||"#8a8574"}))
      .sort((a,b)=>b.value-a.value);
    
    // Compute budget overruns
    const overruns = [];
    categories.forEach(c => {
      if (c.budget > 0) {
        const spent = monthCatMap[c.name] || 0;
        if (spent > c.budget) {
          overruns.push({ category: c.name, spent, budget: c.budget, color: c.color });
        }
      }
    });
      const recent=[...expenses].sort((a,b)=>a.date<b.date?1:a.date>b.date?-1:0).slice(0,6);
    return{todayTotal,monthTotal,fyTotal,yearTotal,monthIncome,monthExpense,monthCatData,overruns,recent,fyLabelStr:fyLabel(sy)};
  },[expenses,categories,catByName]);

  const txData=useMemo(()=>{
    let range={start:new Date(2000,0,1),end:new Date(2100,0,1)};
    if(txPreset!=="all")range=getPeriodRange(txPreset==="custom"?"custom":txPreset,{start:txCustomStart,end:txCustomEnd,specificMonth:txSpecificMonth});
    let rows=expenses.filter(e=>{
      if(range&&!inRange(parseDateStr(e.date),range.start,range.end))return false;
      if(txCategory!=="all"&&e.category!==txCategory)return false;
      if(txAccount!=="all"&&e.accountId!==txAccount)return false;
      if(txSearch.trim()){const q=txSearch.trim().toLowerCase();if(!e.category.toLowerCase().includes(q)&&!(e.note||"").toLowerCase().includes(q))return false;}
      return true;
    });
    rows.sort((a,b)=>{
      if(txSort==="date_desc")return a.date<b.date?1:-1;
      if(txSort==="date_asc")return a.date>b.date?1:-1;
      if(txSort==="amount_desc")return b.amount-a.amount;
      if(txSort==="amount_asc")return a.amount-b.amount;
      return 0;
    });
    return rows;
  },[expenses,txPreset,txCustomStart,txCustomEnd,txSpecificMonth,txCategory,txAccount,txSearch,txSort]);
  const filteredTx = txData;
  const txTotal=useMemo(()=>filteredTx.reduce((s,e)=>s+Number(e.amount||0),0),[filteredTx]);

  /* -- Reports data -- */
  const repRange=useMemo(()=>getPeriodRange(repPreset,{start:repCustomStart,end:repCustomEnd,specificMonth:repSpecificMonth}),[repPreset,repCustomStart,repCustomEnd,repSpecificMonth]);
  const repRows=useMemo(()=>{
    return expenses.filter(e=>{
      const inDate = inRange(parseDateStr(e.date),repRange.start,repRange.end);
      if(!inDate) return false;
      const isInc = e.entryType === "income";
      return repType === "income" ? isInc : !isInc;
    });
  },[expenses,repRange,repType]);
  const repTotal=useMemo(()=>repRows.reduce((s,e)=>s+Number(e.amount||0),0),[repRows]);
  const repCatData=useMemo(()=>{
    const map={};
    repRows.forEach(e=>{map[e.category]=(map[e.category]||0)+Number(e.amount||0);});
    return Object.entries(map).map(([name,value])=>({
      name,value,color:(catByName[name]&&catByName[name].color)||"#8a8574",
      icon:(catByName[name]&&catByName[name].icon)||"MoreHorizontal",
      budget:(catByName[name]&&catByName[name].budget)||0,
      pct:repTotal?(value/repTotal)*100:0,
    })).sort((a,b)=>b.value-a.value);
  },[repRows,catByName,repTotal]);
  const repMethodData=useMemo(()=>{
    const map={};repRows.forEach(e=>{map[e.method||"Other"]=(map[e.method||"Other"]||0)+Number(e.amount||0);});
    return Object.entries(map).map(([name,value])=>({name,value})).sort((a,b)=>b.value-a.value);
  },[repRows]);
  const repTrendData=useMemo(()=>{
    if(repRange.granularity==="month"){
      const order=repRange.fyStart!==undefined?FY_MONTH_ORDER:[0,1,2,3,4,5,6,7,8,9,10,11];
      const baseYear=repRange.start.getFullYear();
      return order.map(m=>{
        const yr=repRange.fyStart!==undefined?(m>=3?repRange.fyStart:repRange.fyStart+1):baseYear;
        const total=repRows.reduce((s,e)=>{const d=parseDateStr(e.date);return d.getMonth()===m&&d.getFullYear()===yr?s+Number(e.amount||0):s;},0);
        return{label:MONTH_NAMES[m],total};
      });
    }
    const days=[];const cursor=new Date(repRange.start);
    while(cursor<=repRange.end){
      const ds=toDateStr(cursor);
      days.push({label:String(cursor.getDate()),total:repRows.filter(e=>e.date===ds).reduce((s,e)=>s+Number(e.amount||0),0)});
      cursor.setDate(cursor.getDate()+1);
    }
    return days;
  },[repRows,repRange]);
  const repTopExpenses=useMemo(()=>[...repRows].sort((a,b)=>b.amount-a.amount).slice(0,5),[repRows]);
  const repDayCount=Math.max(1,daysBetween(repRange.start,repRange.end)+1);
  const repAvgPerDay=repTotal/repDayCount;

  if(loading){return(
    <div className="et-app et-loading">
      <GlobalStyle/><div className="et-loading-stamp">KHATA</div>
      <div style={{color:"#8a8574",fontSize:13}}>Opening the ledger\u2026</div>
    </div>
  );}

  return(
    <div className="et-app">
      <GlobalStyle/>
      <Toast toast={toast}/>

      <div className="et-shell">
        <nav className="et-sidebar">
          <div className="et-brand">
            <div className="et-brand-mark">K</div>
            <div><div className="et-brand-name et-font-display">Khata</div><div className="et-brand-sub">personal ledger</div></div>
          </div>
          <div className="et-tabs">
            <TabButton active={tab==="dashboard"} onClick={()=>setTab("dashboard")} icon={<LayoutDashboard size={17}/>} label="Dashboard"/>
            <TabButton active={tab==="accounts"}   onClick={()=>{setTab("accounts");setSelectedAccountId(null);}} icon={<Wallet size={17}/>} label="Accounts"/>
            <TabButton active={tab==="transactions"} onClick={()=>setTab("transactions")} icon={<Receipt size={17}/>} label="Transactions"/>
            <TabButton active={tab==="transfers"} onClick={()=>setTab("transfers")} icon={<ArrowRightLeft size={17}/>} label="Transfers"/>
            <TabButton active={tab==="budgets"}    onClick={()=>setTab("budgets")} icon={<PiggyBank size={17}/>} label="Budgets"/>
            <TabButton active={tab==="reports"}    onClick={()=>setTab("reports")} icon={<BarChart3 size={17}/>} label="Analytics"/>
            <TabButton active={tab==="settings"}   onClick={()=>setTab("settings")} icon={<Settings size={17}/>} label="Settings"/>
          </div>
          <div className="et-sidebar-actions">
            <button className="et-add-btn" onClick={()=>{setEditingExpense(null);setShowForm(true);}}>
              <Plus size={17}/> Add transaction
            </button>
            <button className="et-transfer-btn" onClick={()=>{setEditingTransfer(null);setShowTransferModal(true);}}>
              <ArrowRightLeft size={15}/> Transfer
            </button>
          </div>
        </nav>

        <main className="et-main">
          {tab==="dashboard"&&(
            <DashboardView dash={dash} categories={categories} accounts={accounts}
              balMap={balMap} netWorth={netWorth} pendingRefunds={pendingRefunds}
              onEdit={e=>{setEditingExpense(e);setShowForm(true);}}
              onViewAccount={id=>{setSelectedAccountId(id);setTab("accounts");}}
              onMarkRefunded={markRefunded}
            />
          )}
          {tab==="accounts"&&(
            <AccountsView
              accounts={accounts} expenses={expenses} transfers={transfers}
              balMap={balMap} netWorth={netWorth} accById={accById} pendingRefunds={pendingRefunds}
              selectedAccountId={selectedAccountId} setSelectedAccountId={setSelectedAccountId}
              onSaveAccount={saveAccount} onDeleteAccount={deleteAccount}
              onMarkRefunded={markRefunded} onWriteOffRefundable={writeOffRefundable} onDeleteTransfer={deleteTransfer}
              onUpdateLiability={updateLiability}
              onEditTransfer={t=>{setEditingTransfer(t);setShowTransferModal(true);}}
              familyMembers={familyMembers}/>
          )}
          {tab==="transactions"&&(
            <TransactionsView
              rows={filteredTx} total={txTotal} categories={categories} accounts={accounts} transfers={transfers}
              search={txSearch} setSearch={setTxSearch}
              category={txCategory} setCategory={setTxCategory}
              account={txAccount} setAccount={setTxAccount}
              preset={txPreset} setPreset={setTxPreset} specificMonth={txSpecificMonth} setSpecificMonth={setTxSpecificMonth}
              customStart={txCustomStart} setCustomStart={setTxCustomStart}
              customEnd={txCustomEnd} setCustomEnd={setTxCustomEnd}
              sort={txSort} setSort={setTxSort}
              onEdit={e=>{setEditingExpense(e);setShowForm(true);}}
              onArmDelete={setConfirmDeleteId} onConfirmDelete={deleteExpense}
              confirmDeleteId={confirmDeleteId}
              onExport={()=>exportCSV(filteredTx,`khata-transactions-${todayStr()}.csv`)}/>
          )}
          {tab==="transfers"&&(
            <TransfersView
              transfers={transfers}
              accounts={accounts}
              familyMembers={familyMembers}
              accById={accById}
              onEditTransfer={t=>{setEditingTransfer(t);setShowTransferModal(true);}}
              onDeleteTransfer={deleteTransfer}
            />
          )}
          {tab==="budgets"&&(
            <BudgetsView
              categories={categories}
              expenses={expenses}
              onBudgetCategory={updateCategoryBudget}
            />
          )}
          {tab==="reports"&&(
            <ReportsView range={repRange} preset={repPreset} setPreset={setRepPreset}
              specificMonth={repSpecificMonth} setSpecificMonth={setRepSpecificMonth}
              customStart={repCustomStart} setCustomStart={setRepCustomStart}
              customEnd={repCustomEnd} setCustomEnd={setRepCustomEnd}
              repType={repType} setRepType={setRepType}
              total={repTotal} catData={repCatData} methodData={repMethodData}
              trendData={repTrendData} topExpenses={repTopExpenses}
              avgPerDay={repAvgPerDay} dayCount={repDayCount}
              onExport={()=>exportCSV(repRows,`khata-report-${repPreset}-${todayStr()}.csv`)}/>
          )}
          {tab==="settings"&&(
            <SettingsView
              accounts={accounts} categories={categories} familyMembers={familyMembers}
              onSaveAccount={saveAccount} onDeleteAccount={deleteAccount}
              onSaveCategory={addCategory} onDeleteCategory={deleteCategory} onBudgetCategory={updateCategoryBudget}
              onSaveFamily={saveFamilyMember} onDeleteFamily={deleteFamilyMember}
              onExportBackup={exportBackupJSON} onImportBackup={importBackupJSON}
              onExportExpensesCSV={()=>exportCSV(expenses, `khata-expenses-${todayStr()}.csv`)}
              onExportTransfersCSV={exportTransfersCSV}
              onImportCSV={handleCSVImport}
              confirmResetOpen={confirmResetOpen} setConfirmResetOpen={setConfirmResetOpen}
              onReset={resetAllExpenses} expenses={expenses}
            />
          )}
        </main>
      </div>

      {showForm&&(
        <ExpenseFormModal categories={categories} accounts={accounts}
          initial={editingExpense}
          onClose={()=>{setShowForm(false);setEditingExpense(null);}}
          onSave={saveExpense} onAddCategory={addCategory}/>
      )}
      {showTransferModal&&(
        <TransferModal accounts={accounts} familyMembers={familyMembers}
          initial={editingTransfer}
          onClose={()=>{setShowTransferModal(false);setEditingTransfer(null);}}
          onSave={saveTransfer}/>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Tab button                                                              */
/* ---------------------------------------------------------------------- */
function TabButton({active,onClick,icon,label}){
  return(
    <button className={`et-tab${active?" et-tab-active":""}`} onClick={onClick}>
      <span className="et-tab-icon">{icon}</span><span>{label}</span>
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/* Dashboard                                                               */
/* ---------------------------------------------------------------------- */
function DashboardView({dash,categories,accounts,balMap,netWorth,pendingRefunds,onEdit,onViewAccount,onMarkRefunded}){
  return(
    <div className="et-fade-in">
      <header className="et-page-header">
        <h1 className="et-font-display et-page-title">Dashboard</h1>
        <p className="et-page-sub">Where your money went, at a glance.</p>
      </header>

      <div className="et-dash-top">
        <div className="et-stamp">
          <div className="et-stamp-inner">
            <div className="et-stamp-label">Net Worth</div>
            <div className="et-stamp-value et-font-mono"style={{color:netWorth>=0?"#2F6B4F":"#A63A2E"}}>{fmtINRCompact(netWorth)}</div>
            <div className="et-stamp-sub">all accounts</div>
          </div>
        </div>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:14,minWidth:280}}>
          <div className="et-stat-grid">
            <StatCard label="Today's Expense" value={dash.todayTotal} icon={<Calendar size={16}/>} tint="#A63A2E"/>
            <StatCard label="Month's Income" value={dash.monthIncome} icon={<IndianRupee size={16}/>} tint="#2F6B4F"/>
            <StatCard label="Month's Expense" value={dash.monthExpense} icon={<Receipt size={16}/>} tint="#33608A"/>
            <StatCard label={dash.fyLabelStr + " Expense"} value={dash.fyTotal} icon={<BarChart3 size={16}/>} tint="#5F7A3D"/>
          </div>
          <div className="et-acc-strip">
            {accounts.map(a=>(
              <button key={a.id} className="et-acc-chip" style={{borderColor:a.color}} onClick={()=>onViewAccount(a.id)}>
                <AccIcon type={a.type} size={13} color={a.color}/>
                <span className="et-acc-chip-name">{a.name}</span>
                <span className="et-acc-chip-bal et-font-mono"style={{color:(balMap[a.id]||0)<0?"#A63A2E":"#2F6B4F"}}>{fmtINRCompact(balMap[a.id]||0)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {pendingRefunds.length>0&&(
        <div className="et-refund-alert">
          <div className="et-refund-alert-head"><Clock size={14}color="#A9792A"/><span>{pendingRefunds.length} pending refund{pendingRefunds.length>1?"s":""} &middot; total {fmtINR(pendingRefunds.reduce((s,t)=>s+Number(t.amount),0))}</span></div>
          {pendingRefunds.map(t=>(
            <div key={t.id} className="et-refund-row">
              <span className="et-font-mono">{fmtINR(t.amount)}</span>
              <span className="et-refund-note">{t.note||"Refundable payment"} &middot; {fmtDateDisplay(t.date)}</span>
              <button className="et-btn-xs et-btn-xs-green" onClick={()=>onMarkRefunded(t.id,t.amount)}><Check size={11}/> Mark refunded</button>
            </div>
          ))}
        </div>
      )}

      {dash.overruns && dash.overruns.length > 0 && (
        <div className="et-refund-alert" style={{background: "#FFF2F2", border: "1px solid #F3C3C3", color: "#A63A2E", marginTop: pendingRefunds.length > 0 ? 12 : 0}}>
          <div className="et-refund-alert-head" style={{color: "#A63A2E"}}><AlertCircle size={14} color="#A63A2E"/><span>Budget Overruns ({dash.overruns.length})</span></div>
          {dash.overruns.map((o, idx) => (
            <div key={idx} className="et-refund-row" style={{borderTop: "1px solid #FBE1E1"}}>
              <span style={{fontWeight: 600}}><span className="et-cat-dot" style={{background: o.color, display: "inline-block", marginRight: 6}}/>{o.category}</span>
              <span className="et-refund-note" style={{color: "#845A5A"}}>Spent: <strong className="et-font-mono">{fmtINR(o.spent)}</strong> &middot; Budget: <strong className="et-font-mono">{fmtINR(o.budget)}</strong></span>
              <span className="et-badge" style={{background: "#FDE8E6", color: "#A63A2E", fontSize: 11, border: "none"}}>Over by {fmtINR(o.spent - o.budget)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="et-dash-grid">
        <div className="et-card et-panel">
          <h3 className="et-panel-title">This month by category</h3>
          {dash.monthCatData.length===0?(
            <EmptyState text="No entries this month yet" sub="Add your first expense."/>
          ):(
            <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:20}}>
              <div style={{width:190,height:190}}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={dash.monthCatData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} paddingAngle={2} stroke="none">
                      {dash.monthCatData.map((d,i)=><Cell key={i} fill={d.color}/>)}
                    </Pie>
                    <Tooltip formatter={v=>fmtINR(v)}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="et-legend-list">
                {dash.monthCatData.slice(0,6).map((d,i)=>(
                  <div key={i} className="et-legend-row">
                    <span className="et-legend-dot"style={{background:d.color}}/>
                    <span className="et-legend-name">{d.name}</span>
                    <span className="et-legend-value et-font-mono">{fmtINR(d.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="et-card et-panel">
          <h3 className="et-panel-title">Recent entries</h3>
          {dash.recent.length===0?(
            <EmptyState text="Your ledger is empty" sub='Tap "Add expense" to record your first entry.'/>
          ):(
            <div className="et-ledger-list">
              {dash.recent.map(e=>{
                const cat=categories.find(c=>c.name===e.category);
                const acc=accounts.find(a=>a.id===e.accountId);
                return(
                  <div key={e.id} className="et-ledger-row" onClick={()=>onEdit(e)}>
                    <span className="et-ledger-icon"style={{background:(cat&&cat.color)||"#8a8574"}}>
                      <CategoryIcon icon={(cat&&cat.icon)||"MoreHorizontal"} color="#FBF6EC" size={14}/>
                    </span>
                    <span className="et-ledger-mid">
                      <span className="et-ledger-cat">{e.category}</span>
                      <span className="et-ledger-note">{e.note||fmtDateDisplay(e.date)}{acc?` · ${acc.name}`:""}</span>
                    </span>
                    <span className={`et-ledger-amt et-font-mono ${e.entryType === "income" ? "et-amt-credit" : "et-amt-debit"}`}>
                      {e.entryType === "income" ? "+" : ""}{fmtINR(e.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Accounts View                                                           */
/* ---------------------------------------------------------------------- */

const GLOBAL_PERIOD_PRESETS=[
  {id:"today",label:"Today"},
  {id:"thisMonth",label:"This Month"},
  {id:"lastMonth",label:"Last Month"},
  {id:"specificMonth",label:"Specific Month"},
  {id:"thisYear",label:"This Year"},
  {id:"thisFY",label:"This FY"},
  {id:"lastFY",label:"Last FY"},
  {id:"custom",label:"Custom"},
];

function AccountsView({
  accounts,expenses,transfers,balMap,netWorth,accById,pendingRefunds,
  selectedAccountId,setSelectedAccountId,
  onSaveAccount,onDeleteAccount,onMarkRefunded,onWriteOffRefundable,onUpdateLiability,onDeleteTransfer,onEditTransfer,familyMembers
}){
  const [showAddAcc,setShowAddAcc]=useState(false);
  const [editingAcc,setEditingAcc]=useState(null);
  const [confirmDelAcc,setConfirmDelAcc]=useState(null);

  // Refunds Ledger States
  const [showAllRefunds, setShowAllRefunds] = useState(false);
  const [refundSearch, setRefundSearch] = useState("");
  const [confirmRelieveId, setConfirmRelieveId] = useState(null);
  const [refundFormId, setRefundFormId] = useState(null);
  const [refAmt, setRefAmt] = useState("");
  const [refDate, setRefDate] = useState(todayStr());
  const [refNote, setRefNote] = useState("");
  const [refMode, setRefMode] = useState("money"); // "money" | "other"
  const [refAccId, setRefAccId] = useState("");

  // Liabilities Ledger States
  const [showAllLiab, setShowAllLiab] = useState(false);
  const [liabSearch, setLiabSearch] = useState("");
  const [liabFormId, setLiabFormId] = useState(null);
  const [liabAmt, setLiabAmt] = useState("");
  const [liabSpentNote, setLiabSpentNote] = useState("");
  const [liabAddFormId, setLiabAddFormId] = useState(null);
  const [liabAddAmt, setLiabAddAmt] = useState("");
  const [liabAddNote, setLiabAddNote] = useState("");
  const [expandedLiabId, setExpandedLiabId] = useState(null);
  const [liabActionAccId, setLiabActionAccId] = useState("");
  const [liabActionDate, setLiabActionDate] = useState("");

  // Period for balance statement
  const [accPeriodPreset,setAccPeriodPreset]=useState("thisMonth");
  const [accPeriodCustomStart,setAccPeriodCustomStart]=useState("");
  const [accPeriodCustomEnd,setAccPeriodCustomEnd]=useState("");
  const [accPeriodSpecificMonth,setAccPeriodSpecificMonth]=useState(todayStr().substring(0,7));
  const [showRefundInput,setShowRefundInput]=useState(null);
  const [refundAmt,setRefundAmt]=useState({});

  const periodRange=useMemo(()=>
    getPeriodRange(accPeriodPreset==="custom"?"custom":accPeriodPreset,{start:accPeriodCustomStart,end:accPeriodCustomEnd,specificMonth:accPeriodSpecificMonth})
  ,[accPeriodPreset,accPeriodCustomStart,accPeriodCustomEnd,accPeriodSpecificMonth]);

  // Per-account period balances
  const periodBals=useMemo(()=>{
    const m={};
    accounts.forEach(a=>{
      m[a.id]=periodBalance(a.id,periodRange.start,periodRange.end,accounts,expenses,transfers);
    });
    return m;
  },[accounts,expenses,transfers,periodRange]);

  // Selected account detail
  const selectedAcc=selectedAccountId?accounts.find(a=>a.id===selectedAccountId):null;
  const selPeriodBal=selectedAccountId?periodBalance(selectedAccountId,periodRange.start,periodRange.end,accounts,expenses,transfers):{opening:0,closing:0,netChange:0};

  const accTimeline=useMemo(()=>{
    if(!selectedAccountId) return[];
    const rows=[];
    expenses.forEach(e=>{
      if(e.accountId!==selectedAccountId) return;
      const d=parseDateStr(e.date);
      if(!inRange(d,periodRange.start,periodRange.end)) return;
      const isIncome = e.entryType === "income";
      rows.push({
        date: e.date,
        type: isIncome ? "income" : "expense",
        amount: isIncome ? Number(e.amount||0) : -Number(e.amount||0),
        label: e.category,
        sub: e.note || (e.method !== "—" ? e.method : ""),
        id: e.id
      });
    });
    transfers.forEach(t=>{
      const d=parseDateStr(t.date);
      const amt=Number(t.amount||0);
      const isDateInRange = inRange(d,periodRange.start,periodRange.end);
      
      if(isDateInRange) {
        if(t.type==="internal"){
          if(t.fromAccountId===selectedAccountId)rows.push({date:t.date,type:"transfer_out",amount:-amt,label:`To ${accById[t.toAccountId]?.name||"?"}`,sub:t.note,id:t.id,transfer:t});
          if(t.toAccountId===selectedAccountId)rows.push({date:t.date,type:"transfer_in",amount:+amt,label:`From ${accById[t.fromAccountId]?.name||"?"}`,sub:t.note,id:t.id,transfer:t});
        } else if(t.type==="family"){
          const famName=t.familyMemberId?familyMembers.find(f=>f.id===t.familyMemberId)?.name:t.familyMember;
          if(t.fromAccountId===selectedAccountId)rows.push({date:t.date,type:"family",amount:-amt,label:`Family · ${famName||"—"}`,sub:t.note,id:t.id,transfer:t});
          if(t.toAccountId===selectedAccountId)rows.push({date:t.date,type:"family",amount:+amt,label:`Family · ${famName||"—"}`,sub:t.note,id:t.id,transfer:t});
        } else if(t.type==="liability"){
          if(t.toAccountId===selectedAccountId){
            const spent=Number(t.spentAmount||0);
            const baseNote = (t.note||"Liability").split(" | ")[0];
            rows.push({date:t.date,type:"liability",amount:+amt-spent,label:`Liability${t.status==="settled"?" (settled)":" (pending)"}`,sub:baseNote,id:t.id,transfer:t});
          }
        } else if(t.type==="refundable" && t.fromAccountId===selectedAccountId) {
          const subNote = t.note ? t.note : "";
          rows.push({date:t.date,type:"refundable",amount:-amt,label:`Refundable${t.status==="refunded"?" (refunded)":" (pending)"}`,sub:subNote,id:t.id,transfer:t});
        }
      }

      if (t.type==="refundable" && t.status==="refunded" && t.refundMode!=="other") {
        const rd = t.refundDate ? parseDateStr(t.refundDate) : d;
        if (inRange(rd,periodRange.start,periodRange.end)) {
          const refunded=Number(t.refundedAmount||0);
          if ((!t.refundAccountId || t.refundAccountId===selectedAccountId) && t.fromAccountId===selectedAccountId) {
            rows.push({date:t.refundDate||t.date,type:"transfer_in",amount:refunded,label:`Refunded to ${accById[selectedAccountId]?.name||"?"}`,sub:t.refundNote,id:t.id+"_refund"});
          } else if (t.refundAccountId===selectedAccountId && t.fromAccountId!==selectedAccountId) {
            rows.push({date:t.refundDate||t.date,type:"transfer_in",amount:refunded,label:`Refund from ${accById[t.fromAccountId]?.name||"?"}`,sub:t.refundNote,id:t.id+"_refund"});
          }
        }
      }

      if (t.type==="liability" && t.history && t.history.length > 0) {
        t.history.forEach(h => {
          if (h.accountId === selectedAccountId && inRange(parseDateStr(h.date), periodRange.start, periodRange.end)) {
            const baseNote = (t.note||"Liability").split(" | ")[0];
            if (h.type === "added") {
              rows.push({date: h.date, type: "liability", amount: +Number(h.amount), label: `Liability Added (${baseNote})`, sub: h.note, id: h.id, transfer: t});
            } else if (h.type === "spent") {
              rows.push({date: h.date, type: "liability", amount: -Number(h.amount), label: `Liability Spent (${baseNote})`, sub: h.note, id: h.id, transfer: t});
            }
          }
        });
      }
    });
    rows.sort((a,b)=>a.date<b.date?1:-1);
    return rows;
  },[selectedAccountId,expenses,transfers,accById,familyMembers,periodRange]);

  // Period selector strip (shared between grid and detail view)
  const PeriodStrip=()=>(
    <div className="et-card et-filters et-period-strip">
      <div className="et-filter-presets">
        {GLOBAL_PERIOD_PRESETS.map(p=>(
          <button key={p.id} className={`et-chip${accPeriodPreset===p.id?" et-chip-active":""}`} onClick={()=>setAccPeriodPreset(p.id)}>{p.label}</button>
        ))}
      </div>
      {accPeriodPreset==="custom"&&(
        <div className="et-filter-row">
          <input type="date" className="et-input" value={accPeriodCustomStart} onChange={e=>setAccPeriodCustomStart(e.target.value)}/>
          <span className="et-arrow-sep">&rarr;</span>
          <input type="date" className="et-input" value={accPeriodCustomEnd} onChange={e=>setAccPeriodCustomEnd(e.target.value)}/>
        </div>
      )}
      {accPeriodPreset==="specificMonth"&&(
        <div className="et-filter-row">
          <input type="month" className="et-input" value={accPeriodSpecificMonth} onChange={e=>setAccPeriodSpecificMonth(e.target.value)}/>
        </div>
      )}
    </div>
  );

  /* ---- Account Detail View ---- */
  if(selectedAcc){
    const bal = balMap[selectedAccountId] || 0;
    return(
      <div className="et-fade-in">
        <header className="et-page-header et-page-header-row">
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button className="et-icon-btn" onClick={()=>setSelectedAccountId(null)}><X size={16}/></button>
            <div>
              <h1 className="et-font-display et-page-title" style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{width:10,height:10,borderRadius:"50%",background:selectedAcc.color,display:"inline-block"}}/>
                {selectedAcc.name}
              </h1>
              <p className="et-page-sub">{selectedAcc.type==="cash"?"Cash":"Bank"} · Opening {fmtINR(selectedAcc.openingBalance)} as of {fmtDateDisplay(selectedAcc.openingDate||todayStr())}</p>
            </div>
          </div>
          <div className="et-acc-balance-big">
            <div className="et-acc-balance-label">Current Balance</div>
            <div className="et-font-mono et-acc-balance-now" style={{color:bal<0?"#A63A2E":"#2F6B4F"}}>
              {fmtINR(bal)}
            </div>
          </div>
        </header>

        <PeriodStrip/>

        {/* Opening / Closing balance for period */}
        <div className="et-bal-summary-row">
          <BalanceBlock label={`Opening · ${periodRange.label}`} value={selPeriodBal.opening}/>
          <div className="et-bal-arrow">→</div>
          <BalanceBlock label="Net Change" value={selPeriodBal.netChange}/>
          <div className="et-bal-arrow">→</div>
          <BalanceBlock label="Closing Balance" value={selPeriodBal.closing} size="lg"/>
        </div>

        <div className="et-card et-panel" style={{marginTop:16}}>
          <h3 className="et-panel-title">Transactions in {periodRange.label} ({accTimeline.length})</h3>
          {accTimeline.length===0?(
            <EmptyState text="No transactions in this period"/>
          ):(
            <div className="et-acc-timeline">
              {accTimeline.map((row,i)=>(
                <div key={`${row.id}_${i}`} className="et-acc-tl-row">
                  <div className={`et-acc-tl-icon ${row.amount<0?"et-tl-debit":"et-tl-credit"}`}>
                    {row.type==="expense"&&<TrendingDown size={13}/>}
                    {row.type==="income"&&<ArrowDownLeft size={13}/>}
                    {row.type==="transfer_in"&&<ArrowDownLeft size={13}/>}
                    {row.type==="transfer_out"&&<ArrowUpRight size={13}/>}
                    {row.type==="family"&&<Users size={13}/>}
                    {row.type==="refundable"&&<RefreshCcw size={13}/>}
                    {row.type==="liability"&&<Download size={13}/>}
                  </div>
                  <div className="et-acc-tl-mid">
                    <span className="et-acc-tl-label">{row.label}</span>
                    <span className="et-acc-tl-sub">{fmtDateDisplay(row.date)}{row.sub?` · ${row.sub}`:""}</span>
                  </div>
                  <div className={`et-acc-tl-amt et-font-mono ${row.amount<0?"et-amt-debit":"et-amt-credit"}`}>
                    {row.amount>=0?"+":""}{fmtINR(row.amount)}
                  </div>
                  {row.transfer&&row.type==="refundable"&&row.transfer.status!=="refunded"&&(
                    showRefundInput===row.id?(
                      <div style={{display:"flex",gap:4}}>
                        <input type="number" className="et-input" style={{width:90,padding:"4px 8px",fontSize:12}} placeholder="Amt"
                          value={refundAmt[row.id]||""} onChange={e=>setRefundAmt(p=>({...p,[row.id]:e.target.value}))}/>
                        <button className="et-btn-xs et-btn-xs-green" onClick={()=>{onMarkRefunded(row.transfer.id,refundAmt[row.id]||row.transfer.amount);setShowRefundInput(null);}}>
                          <Check size={11}/> Done
                        </button>
                        <button className="et-icon-btn" onClick={()=>setShowRefundInput(null)}><X size={12}/></button>
                      </div>
                    ):(
                      <button className="et-btn-xs" onClick={()=>setShowRefundInput(row.id)}><RefreshCcw size={11}/> Refund</button>
                    )
                  )}
                  {/* Transfers can only be deleted from the Transfers tab */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ---- Accounts Grid View ---- */
  return(
    <div className="et-fade-in">
      <header className="et-page-header et-page-header-row">
        <div>
          <h1 className="et-font-display et-page-title">Accounts</h1>
          <p className="et-page-sub">Net worth: <strong className="et-font-mono"style={{color:netWorth>=0?"#2F6B4F":"#A63A2E"}}>{fmtINR(netWorth)}</strong></p>
        </div>
      </header>

      <PeriodStrip/>

      {/* Overall period summary */}
      <div className="et-bal-summary-row" style={{marginTop:0}}>
        {accounts.map(a=>{
          const pb=periodBals[a.id]||{opening:0,closing:0,netChange:0};
          return(
            <div key={a.id} className="et-card et-acc-period-card" style={{borderTop:`3px solid ${a.color}`}} onClick={()=>setSelectedAccountId(a.id)}>
              <div className="et-acc-period-name" style={{color:a.color}}><AccIcon type={a.type} size={13} color={a.color}/> {a.name}</div>
              <div className="et-acc-period-row">
                <span className="et-acc-period-lbl">Opening</span>
                <span className={`et-font-mono et-acc-period-val ${pb.opening<0?"et-amt-debit":"et-amt-credit"}`}>{fmtINR(pb.opening)}</span>
              </div>
              <div className="et-acc-period-row">
                <span className="et-acc-period-lbl">Income</span>
                <span className={`et-font-mono et-acc-period-val ${pb.income>0?"et-amt-credit":"et-acc-period-zero"}`}>{pb.income>0?"+":""}{fmtINR(pb.income)}</span>
              </div>
              <div className="et-acc-period-row">
                <span className="et-acc-period-lbl">Transfer</span>
                <span className={`et-font-mono et-acc-period-val ${pb.transfer<0?"et-amt-debit":pb.transfer>0?"et-amt-credit":"et-acc-period-zero"}`}>{pb.transfer>0?"+":""}{pb.transfer<0?"-":""}{fmtINR(Math.abs(pb.transfer))}</span>
              </div>
              <div className="et-acc-period-row">
                <span className="et-acc-period-lbl">Expense</span>
                <span className={`et-font-mono et-acc-period-val ${pb.expense>0?"et-amt-debit":"et-acc-period-zero"}`}>{pb.expense>0?"-":""}{fmtINR(pb.expense)}</span>
              </div>
              <div className="et-acc-period-row et-acc-period-closing">
                <span className="et-acc-period-lbl">Closing</span>
                <span className={`et-font-mono et-acc-period-val ${pb.closing<0?"et-amt-debit":"et-amt-credit"}`}>{fmtINR(pb.closing)}</span>
              </div>
              <div className="et-acc-card-detail">View history <ChevronRight size={13}/></div>
            </div>
          );
        })}
      </div>

      {/* Refunds Ledger Panel */}
      <div className="et-card et-panel" style={{marginTop:20}}>
        <div className="et-section-header" style={{borderBottom: "none", marginBottom: 0, paddingBottom: 0}}>
          <h3 className="et-panel-title" style={{margin: 0}}><RefreshCcw size={14}/> Refunds Ledger</h3>
          <label style={{display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5c563f", cursor: "pointer"}}>
            <input type="checkbox" checked={showAllRefunds} onChange={e=>setShowAllRefunds(e.target.checked)}/>
            Show completed &amp; write-offs
          </label>
        </div>

        {transfers.filter(t=>t.type==="refundable").length === 0 ? (
          <EmptyState text="No refundable payments recorded yet" sub="Record one by using the Transfer button."/>
        ) : (
          <div className="et-acc-timeline" style={{marginTop:12}}>
            {/* Search Bar for Refunds */}
            <div className="et-search-wrap" style={{marginBottom: 12, width: "100%", maxWidth: 320}}>
              <Search size={14} color="#8a8574"/>
              <input
                className="et-input et-input-plain"
                placeholder="Search refunds by note, account, amount..."
                value={refundSearch}
                onChange={e=>setRefundSearch(e.target.value)}
              />
            </div>

            {transfers
              .filter(t=>t.type==="refundable")
              .filter(t=>showAllRefunds ? true : t.status === "pending")
              .filter(t=>{
                if(!refundSearch.trim()) return true;
                const q = refundSearch.toLowerCase().trim();
                const noteMatch = (t.note||"").toLowerCase().includes(q);
                const accMatch = (accById[t.fromAccountId]?.name||"").toLowerCase().includes(q);
                const amtMatch = String(t.amount).includes(q);
                return noteMatch || accMatch || amtMatch;
              })
              .sort((a,b)=>a.date<b.date?1:-1)
              .map(t=>(
                <div key={t.id} className="et-acc-tl-row" style={{flexDirection: "column", alignItems: "stretch", gap: 4}}>
                  <div style={{display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between"}}>
                    <div style={{display: "flex", alignItems: "center", gap: 10}}>
                      <div className={`et-acc-tl-icon ${t.status==="refunded" ? "et-tl-credit" : t.status==="written_off" ? "et-tl-debit" : "et-tl-debit"}`} style={{opacity: t.status!=="pending" ? 0.6 : 1}}>
                        <RefreshCcw size={13}/>
                      </div>
                      <div className="et-acc-tl-mid">
                        <span className="et-acc-tl-label" style={{textDecoration: t.status!=="pending" ? "line-through" : "none", color: t.status!=="pending" ? "#8a8574" : "#2A2A20"}}>
                          {t.note||"Refundable payment"}
                        </span>
                        <span className="et-acc-tl-sub">
                          Paid: {fmtDateDisplay(t.date)} · from {accById[t.fromAccountId]?.name||"—"}
                        </span>
                      </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center", gap: 12}}>
                      <span className="et-font-mono" style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: t.status==="refunded" ? "#2F6B4F" : t.status==="written_off" ? "#8a8574" : "#A63A2E"
                      }}>
                        {fmtINR(t.amount)}
                      </span>
                      {t.status === "pending" && (
                        <div style={{display: "flex", gap: 4}}>
                          <button className="et-btn-xs et-btn-xs-green" onClick={()=>{
                            setRefundFormId(t.id);
                            setRefAmt(String(t.amount));
                            setRefDate(todayStr());
                            setRefNote("");
                            setRefMode("money");
                            setRefAccId(t.fromAccountId);
                          }}><Check size={11}/> Refunded</button>
                          {confirmRelieveId === t.id ? (
                            <div style={{display: "flex", gap: 3, alignItems: "center", background: "#FDE8E6", padding: "2px 6px", borderRadius: 4}}>
                              <span style={{fontSize: 11, color: "#A63A2E"}}>Relieve?</span>
                              <button className="et-icon-btn et-icon-danger" style={{padding: 2}} onClick={()=>{onWriteOffRefundable(t.id); setConfirmRelieveId(null);}}><Check size={11}/></button>
                              <button className="et-icon-btn" style={{padding: 2}} onClick={()=>setConfirmRelieveId(null)}><X size={11}/></button>
                            </div>
                          ) : (
                            <button className="et-btn-xs" onClick={()=>setConfirmRelieveId(t.id)}>Write Off</button>
                          )}
                        </div>
                      )}
                      {t.status === "refunded" && (
                        <span className="et-badge et-badge-internal" style={{fontSize: 11}}>
                          ✓ Refunded {fmtINR(t.refundedAmount)} on {fmtDateDisplay(t.refundDate||t.date)}
                          {t.refundMode === "other" ? " (Other" : ` (Money to ${accById[t.refundAccountId]?.name || "account"}`}
                          {t.refundNote ? `: ${t.refundNote})` : ")"}
                        </span>
                      )}
                      {t.status === "written_off" && (
                        <span className="et-badge" style={{background: "#EDE6D3", color: "#6b6654", fontSize: 11}}>
                          Written Off / Relieved
                        </span>
                      )}
                    </div>
                  </div>

                  {refundFormId === t.id && (
                    <div className="et-filter-row" style={{
                      background: "#F5EFDF",
                      padding: "8px 12px",
                      borderRadius: 6,
                      marginTop: 6,
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-end"
                    }}>
                      <label className="et-field"><span>Refund Mode</span>
                        <select className="et-input" style={{fontSize: 12, padding: "4px 8px"}} value={refMode} onChange={e=>setRefMode(e.target.value)}>
                          <option value="money">Money</option>
                          <option value="other">Other</option>
                        </select>
                      </label>
                      
                      {refMode === "money" ? (
                        <label className="et-field"><span>Received in Account</span>
                          <select className="et-input" style={{fontSize: 12, padding: "4px 8px"}} value={refAccId} onChange={e=>setRefAccId(e.target.value)}>
                            {accounts.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
                          </select>
                        </label>
                      ) : (
                        <label className="et-field"><span>Specify Note</span>
                          <input className="et-input" style={{padding: "4px 8px", fontSize: 12}} placeholder="e.g. Amazon Voucher" value={refNote} onChange={e=>setRefNote(e.target.value)}/>
                        </label>
                      )}

                      <label className="et-field"><span>Refund date</span>
                        <input type="date" className="et-input" style={{padding: "4px 8px", fontSize: 12}} value={refDate} onChange={e=>setRefDate(e.target.value)} max={todayStr()}/>
                      </label>
                      <label className="et-field"><span>Refunded amount (₹)</span>
                        <input type="number" step="0.01" className="et-input et-font-mono" style={{padding: "4px 8px", fontSize: 12, width: 110}} value={refAmt} onChange={e=>setRefAmt(e.target.value)}/>
                      </label>
                      
                      {refMode === "money" && (
                        <label className="et-field"><span>Refund note (optional)</span>
                          <input className="et-input" style={{padding: "4px 8px", fontSize: 12}} placeholder="e.g. UPI, Cash" value={refNote} onChange={e=>setRefNote(e.target.value)}/>
                        </label>
                      )}

                      <button className="et-btn-xs et-btn-xs-green" onClick={()=>{
                        onMarkRefunded(t.id, parseFloat(refAmt)||t.amount, refDate, refMode, refMode === "money" ? refAccId : null, refNote);
                        setRefundFormId(null);
                      }}><Check size={11}/> Save</button>
                      <button className="et-btn-xs" onClick={()=>setRefundFormId(null)}><X size={11}/> Cancel</button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Liabilities Ledger Panel */}
      <div className="et-card et-panel" style={{marginTop:20}}>
        <div className="et-section-header" style={{borderBottom: "none", marginBottom: 0, paddingBottom: 0}}>
          <h3 className="et-panel-title" style={{margin: 0}}><Download size={14}/> Liabilities Ledger</h3>
          <label style={{display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5c563f", cursor: "pointer"}}>
            <input type="checkbox" checked={showAllLiab} onChange={e=>setShowAllLiab(e.target.checked)}/>
            Show settled
          </label>
        </div>

        {transfers.filter(t=>t.type==="liability").length === 0 ? (
          <EmptyState text="No liabilities recorded yet" sub="Record received funds using the Transfer button."/>
        ) : (
          <div className="et-acc-timeline" style={{marginTop:12}}>
            <div className="et-search-wrap" style={{marginBottom: 12, width: "100%", maxWidth: 320}}>
              <Search size={14} color="#8a8574"/>
              <input
                className="et-input et-input-plain"
                placeholder="Search liabilities by note, account..."
                value={liabSearch}
                onChange={e=>setLiabSearch(e.target.value)}
              />
            </div>

            {transfers
              .filter(t=>t.type==="liability")
              .filter(t=>showAllLiab ? true : t.status === "pending")
              .filter(t=>{
                if(!liabSearch.trim()) return true;
                const q = liabSearch.toLowerCase().trim();
                const noteMatch = (t.note||"").toLowerCase().includes(q);
                const accMatch = (accById[t.toAccountId]?.name||"").toLowerCase().includes(q);
                return noteMatch || accMatch;
              })
              .sort((a,b)=>a.date<b.date?1:-1)
              .map(t=>{
                const baseSpent = Number(t.spentAmount||0);
                const histSpent = (t.history||[]).filter(h=>h.type==="spent").reduce((s,h)=>s+h.amount,0);
                const spent = baseSpent + histSpent;

                const baseAmt = Number(t.amount||0);
                const histAmt = (t.history||[]).filter(h=>h.type==="added").reduce((s,h)=>s+h.amount,0);
                const totalAmt = baseAmt + histAmt;

                const rem = totalAmt - spent;
                const noteParts = (t.note||"Liability").split(" | ");
                const baseName = noteParts[0];
                const historyParts = noteParts.slice(1);
                const legacyHistoryCount = Math.max(0, historyParts.length - (t.history?.length || 0));
                const legacyParts = historyParts.slice(0, legacyHistoryCount);
                return (
                  <div key={t.id} className="et-acc-tl-row" style={{flexDirection: "column", alignItems: "stretch", gap: 4}}>
                    <div style={{display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between"}}>
                      <div style={{display: "flex", alignItems: "flex-start", gap: 10}}>
                        <div className={`et-acc-tl-icon ${t.status==="settled" ? "et-tl-debit" : "et-tl-credit"}`} style={{opacity: t.status!=="pending" ? 0.6 : 1, marginTop: 4}}>
                          <Download size={13}/>
                        </div>
                        <div className="et-acc-tl-mid">
                          <span className="et-acc-tl-label" style={{textDecoration: t.status!=="pending" ? "line-through" : "none", color: t.status!=="pending" ? "#8a8574" : "#2A2A20"}}>
                            {baseName}
                          </span>
                          <span className="et-acc-tl-sub">
                            Rcvd: {fmtDateDisplay(t.date)} · in {accById[t.toAccountId]?.name||"—"}
                          </span>
                          {historyParts.length > 0 && (
                            <button className="et-btn-xs" style={{marginTop: 4, alignSelf: "flex-start", background: "transparent", border: "none", color: "#33608A", padding: 0, textDecoration: "underline"}} onClick={() => setExpandedLiabId(expandedLiabId === t.id ? null : t.id)}>
                              {expandedLiabId === t.id ? "Hide details" : "View details"}
                            </button>
                          )}
                          {expandedLiabId === t.id && historyParts.length > 0 && (
                            <div style={{marginTop: 6, fontSize: 11, color: "#5c563f", background: "#fbf6ec", padding: 8, borderRadius: 6, border: "1px solid #E3DBC6", overflowX: "auto"}}>
                              {legacyParts.length > 0 && (
                                <div style={{marginBottom: (t.history&&t.history.length>0)?8:0}}>
                                  <div style={{fontWeight: 600, marginBottom: 4, color: "#8a8574"}}>Older History</div>
                                  {legacyParts.map((hp, i) => (
                                    <div key={i} style={{marginBottom: 2}}>• {hp}</div>
                                  ))}
                                </div>
                              )}
                              {t.history && t.history.length > 0 && (
                                <table style={{width: "100%", borderCollapse: "collapse", minWidth: 450}}>
                                  <thead>
                                    <tr style={{borderBottom: "1px solid #DDD6C4", color: "#8a8574", textAlign: "left"}}>
                                      <th style={{padding: "4px 8px 4px 0"}}>Date</th>
                                      <th style={{padding: "4px 8px"}}>Action</th>
                                      <th style={{padding: "4px 8px"}}>Account</th>
                                      <th style={{padding: "4px 8px"}}>Reason</th>
                                      <th style={{padding: "4px 8px", textAlign: "right"}}>Opening</th>
                                      <th style={{padding: "4px 8px", textAlign: "right"}}>Amount</th>
                                      <th style={{padding: "4px 0 4px 8px", textAlign: "right"}}>Closing</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(() => {
                                      let rb = Number(t.amount||0) - Number(t.spentAmount||0);
                                      return t.history.map((h, i) => {
                                        const open = rb;
                                        const isSpent = h.type === "spent";
                                        const amt = Number(h.amount);
                                        const close = isSpent ? open - amt : open + amt;
                                        rb = close;
                                        return (
                                          <tr key={i} style={{borderBottom: i<t.history.length-1?"1px solid #EAE3D1":"none"}}>
                                            <td style={{padding: "4px 8px 4px 0", whiteSpace: "nowrap"}}>{fmtDateDisplay(h.date)}</td>
                                            <td style={{padding: "4px 8px"}}>
                                              <span className={`et-badge ${isSpent ? "et-badge-expense" : "et-badge-income"}`} style={{fontSize: 9, padding: "2px 4px"}}>{isSpent ? "Spent" : "Added"}</span>
                                            </td>
                                            <td style={{padding: "4px 8px"}}>{accById[h.accountId]?.name||"—"}</td>
                                            <td style={{padding: "4px 8px"}}>{h.note || "—"}</td>
                                            <td style={{padding: "4px 8px", textAlign: "right", fontFamily: "monospace"}}>{fmtINRCompact(open)}</td>
                                            <td style={{padding: "4px 8px", textAlign: "right", fontFamily: "monospace", color: isSpent ? "#A63A2E" : "#317453"}}>{isSpent ? "-" : "+"}{fmtINRCompact(amt)}</td>
                                            <td style={{padding: "4px 0 4px 8px", textAlign: "right", fontFamily: "monospace", fontWeight: 600}}>{fmtINRCompact(close)}</td>
                                          </tr>
                                        );
                                      });
                                    })()}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{display: "flex", alignItems: "center", gap: 12}}>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                          <span className="et-font-mono" style={{ fontSize: 13, fontWeight: 600, color: t.status==="settled" ? "#8a8574" : "#A63A2E" }}>
                            Available: {fmtINR(rem)}
                          </span>
                          <span className="et-font-mono" style={{ fontSize: 10, color: "#8a8574" }}>
                            Total: {fmtINR(totalAmt)} | Spent: {fmtINR(spent)}
                          </span>
                        </div>
                        {t.status === "pending" && (
                          <div style={{display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end"}}>
                            <button className="et-btn-xs" onClick={()=>{setLiabFormId(t.id); setLiabAmt(String(rem)); setLiabSpentNote(""); setLiabActionAccId(t.toAccountId); setLiabActionDate(todayStr()); setLiabAddFormId(null);}}>Log Spent</button>
                            <button className="et-btn-xs" onClick={()=>{setLiabAddFormId(t.id); setLiabAddAmt(""); setLiabAddNote(""); setLiabActionAccId(t.toAccountId); setLiabActionDate(todayStr()); setLiabFormId(null);}}>Add Funds</button>
                            <button className="et-btn-xs et-btn-xs-green" onClick={()=>{onUpdateLiability(t.id, rem, true, "", 0, "", t.toAccountId, todayStr());}}><Check size={11}/> Settle All</button>
                          </div>
                        )}
                        {t.status === "settled" && (
                          <span className="et-badge et-badge-internal" style={{fontSize: 11}}>✓ Settled</span>
                        )}
                      </div>
                    </div>

                    {liabFormId === t.id && (
                      <div className="et-filter-row" style={{
                        background: "#F5EFDF", padding: "8px 12px", borderRadius: 6, marginTop: 6,
                        display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap"
                      }}>
                        <label className="et-field"><span>Date</span>
                          <input type="date" className="et-input" style={{padding: "4px 8px", fontSize: 12}} value={liabActionDate} onChange={e=>setLiabActionDate(e.target.value)}/>
                        </label>
                        <label className="et-field"><span>Spent Amount (₹)</span>
                          <input type="number" step="0.01" className="et-input et-font-mono" style={{padding: "4px 8px", fontSize: 12, width: 100}} value={liabAmt} onChange={e=>setLiabAmt(e.target.value)}/>
                        </label>
                        <label className="et-field"><span>From Account</span>
                          <select className="et-input" style={{fontSize: 12, padding: "4px 8px"}} value={liabActionAccId} onChange={e=>setLiabActionAccId(e.target.value)}>
                            {accounts.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
                          </select>
                        </label>
                        <label className="et-field"><span>Reason / Note</span>
                          <input className="et-input" style={{padding: "4px 8px", fontSize: 12, width: 140}} placeholder="e.g. Paid for dinner" value={liabSpentNote} onChange={e=>setLiabSpentNote(e.target.value)}/>
                        </label>
                        <button className="et-btn-xs et-btn-xs-green" onClick={()=>{
                          const added = parseFloat(liabAmt)||0;
                          const willSettle = (spent + added) >= totalAmt;
                          onUpdateLiability(t.id, added, willSettle, liabSpentNote, 0, "", liabActionAccId, liabActionDate);
                          setLiabFormId(null);
                        }}><Check size={11}/> Save</button>
                        <button className="et-btn-xs" onClick={()=>setLiabFormId(null)}><X size={11}/> Cancel</button>
                      </div>
                    )}
                    {liabAddFormId === t.id && (
                      <div className="et-filter-row" style={{
                        background: "#E8F0E6", padding: "8px 12px", borderRadius: 6, marginTop: 6,
                        display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap"
                      }}>
                        <label className="et-field"><span>Date</span>
                          <input type="date" className="et-input" style={{padding: "4px 8px", fontSize: 12}} value={liabActionDate} onChange={e=>setLiabActionDate(e.target.value)}/>
                        </label>
                        <label className="et-field"><span>Add Amount (₹)</span>
                          <input type="number" step="0.01" className="et-input et-font-mono" style={{padding: "4px 8px", fontSize: 12, width: 100}} placeholder="Extra funds" value={liabAddAmt} onChange={e=>setLiabAddAmt(e.target.value)}/>
                        </label>
                        <label className="et-field"><span>To Account</span>
                          <select className="et-input" style={{fontSize: 12, padding: "4px 8px"}} value={liabActionAccId} onChange={e=>setLiabActionAccId(e.target.value)}>
                            {accounts.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
                          </select>
                        </label>
                        <label className="et-field"><span>Reason / Note</span>
                          <input className="et-input" style={{padding: "4px 8px", fontSize: 12, width: 140}} placeholder="e.g. Extra given" value={liabAddNote} onChange={e=>setLiabAddNote(e.target.value)}/>
                        </label>
                        <button className="et-btn-xs et-btn-xs-green" onClick={()=>{
                          const addedFunds = parseFloat(liabAddAmt)||0;
                          if (addedFunds > 0) {
                            onUpdateLiability(t.id, 0, false, "", addedFunds, liabAddNote, liabActionAccId, liabActionDate);
                          }
                          setLiabAddFormId(null);
                        }}><Check size={11}/> Save</button>
                        <button className="et-btn-xs" onClick={()=>setLiabAddFormId(null)}><X size={11}/> Cancel</button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {showAddAcc&&(
        <AccountFormModal initial={editingAcc} onClose={()=>{setShowAddAcc(false);setEditingAcc(null);}}
          onSave={p=>{onSaveAccount(p);setShowAddAcc(false);setEditingAcc(null);}}/>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Account Form Modal                                                      */
/* ---------------------------------------------------------------------- */
function AccountFormModal({initial,onClose,onSave}){
  const isNew=!initial?.id;
  const [name,setName]=useState(initial?.name||"");
  const [type,setType]=useState(initial?.type||"bank");
  const [color,setColor]=useState(initial?.color||ACCOUNT_COLORS[0]);
  const [openingBalance,setOpeningBalance]=useState(initial?.openingBalance!=null?String(initial.openingBalance):"");
  const [openingDate,setOpeningDate]=useState(initial?.openingDate||todayStr());
  const [error,setError]=useState("");

  function submit(){
    if(!name.trim())return setError("Enter an account name.");
    if(!openingDate)return setError("Pick an opening balance date.");
    setError("");
    onSave({id:initial?.id,name:name.trim(),type,color,openingBalance:parseFloat(openingBalance)||0,openingDate});
  }

  return(
    <div className="et-modal-backdrop" onClick={onClose}>
      <div className="et-modal" onClick={e=>e.stopPropagation()} style={{maxWidth:440}}>
        <div className="et-modal-head">
          <h2 className="et-font-display et-modal-title">{isNew?"Add account":"Edit account"}</h2>
          <button className="et-icon-btn" onClick={onClose}><X size={17}/></button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <label className="et-field"><span>Account name</span>
            <input className="et-input" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. SBI Savings"/>
          </label>
          <label className="et-field"><span>Type</span>
            <select className="et-input" value={type} onChange={e=>setType(e.target.value)}>
              <option value="bank">Bank account</option>
              <option value="cash">Cash</option>
            </select>
          </label>
          <div className="et-form-grid">
            <label className="et-field"><span>Opening balance (₹)</span>
              <input type="number" step="0.01" className="et-input et-font-mono" placeholder="0.00" value={openingBalance} onChange={e=>setOpeningBalance(e.target.value)}/>
            </label>
            <label className="et-field"><span>As of date</span>
              <input type="date" className="et-input" value={openingDate} onChange={e=>setOpeningDate(e.target.value)}/>
            </label>
          </div>
          <p className="et-field-hint">Enter your account balance on the "as of date". All transactions after that date will adjust the balance automatically.</p>
          <label className="et-field"><span>Colour</span>
            <div className="et-swatch-row"style={{marginTop:4}}>
              {ACCOUNT_COLORS.map(c=>(
                <button key={c} className={`et-swatch${color===c?" et-swatch-active":""}`} style={{background:c}} onClick={()=>setColor(c)}/>
              ))}
            </div>
          </label>
        </div>
        {error&&<div className="et-form-error"><AlertCircle size={14}/> {error}</div>}
        <div className="et-modal-actions">
          <button className="et-btn-outline" onClick={onClose}>Cancel</button>
          <button className="et-btn-primary" onClick={submit}><Check size={15}/> {isNew?"Add account":"Save changes"}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Consolidated Settings View                                              */
/* ---------------------------------------------------------------------- */

function SettingsView({
  accounts, categories, familyMembers,
  onSaveAccount, onDeleteAccount,
  onSaveCategory, onDeleteCategory, onBudgetCategory,
  onSaveFamily, onDeleteFamily,
  onExportBackup, onImportBackup,
  onExportExpensesCSV, onExportTransfersCSV, onImportCSV,
  confirmResetOpen, setConfirmResetOpen, onReset, expenses
}) {
  const [subTab, setSubTab] = useState("accounts");

  // Account form sub-state
  const [showAddAcc, setShowAddAcc] = useState(false);
  const [editingAcc, setEditingAcc] = useState(null);
  const [confirmDelAcc, setConfirmDelAcc] = useState(null);

  // Category form sub-state
  const [showAddCat, setShowAddCat] = useState(false);
  const [catName, setCatName] = useState("");
  const [catColor, setCatColor] = useState(COLOR_CHOICES[0]);
  const [catIcon, setCatIcon] = useState(ICON_CHOICES[0]);
  const [confirmDelCat, setConfirmDelCat] = useState(null);

  // Family form sub-state
  const [showAddFam, setShowAddFam] = useState(false);
  const [editingFam, setEditingFam] = useState(null);
  const [confirmDelFam, setConfirmDelFam] = useState(null);

  const spentThisMonth = useMemo(() => {
    const som = startOfMonth(new Date()), eom = endOfMonth(new Date());
    const map = {};
    expenses.forEach((e) => {
      const d = parseDateStr(e.date);
      if (inRange(d, som, eom)) map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
    });
    return map;
  }, [expenses]);

  function submitAddCategory() {
    if (!catName.trim()) return;
    onSaveCategory({ name: catName.trim(), color: catColor, icon: catIcon, budget: 0, type: subTab === "income_categories" ? "income" : "expense" });
    setCatName(""); setCatColor(COLOR_CHOICES[0]); setCatIcon(ICON_CHOICES[0]); setShowAddCat(false);
  }

  return (
    <div className="et-fade-in">
      <header className="et-page-header">
        <h1 className="et-font-display et-page-title">Settings</h1>
        <p className="et-page-sub">Configure accounts, categories, family members, and data backups.</p>
      </header>

      {/* Settings Navigation Bar */}
      <div className="et-settings-nav" style={{ flexWrap: "wrap", gap: 4 }}>
        {[
          { id: "accounts", label: "Bank & Cash Accounts" },
          { id: "categories", label: "Expense Categories" },
          { id: "income_categories", label: "Income Categories" },
          { id: "family", label: "Family Members" },
          { id: "data", label: "Backup & Sync" },
        ].map((btn) => (
          <button
            key={btn.id}
            className={`et-settings-nav-btn ${subTab === btn.id ? "et-settings-nav-btn-active" : ""}`}
            onClick={() => setSubTab(btn.id)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="et-settings-content" style={{ marginTop: 20 }}>
        {/* --- ACCOUNTS SECTION --- */}
        {subTab === "accounts" && (
          <div className="et-fade-in">
            <div className="et-section-header">
              <h3 className="et-section-title">Manage Accounts</h3>
              <button className="et-btn-outline" onClick={() => { setEditingAcc({}); setShowAddAcc(true); }}><Plus size={14} /> Add Account</button>
            </div>
            <div className="et-acc-grid" style={{ marginTop: 14 }}>
              {accounts.map((acc) => (
                <div key={acc.id} className="et-card et-acc-card" style={{ borderTop: `3px solid ${acc.color}` }}>
                  <div className="et-acc-card-top">
                    <div className="et-acc-card-icon" style={{ background: acc.color + "22", color: acc.color }}>
                      <AccIcon type={acc.type} size={20} color={acc.color} />
                    </div>
                    <div className="et-acc-card-info">
                      <div className="et-acc-card-name">{acc.name}</div>
                      <div className="et-acc-card-type">{acc.type === "cash" ? "Cash" : "Bank"} · Opening {fmtINRCompact(acc.openingBalance)}</div>
                    </div>
                    <div className="et-acc-card-actions">
                      <button className="et-icon-btn" onClick={() => { setEditingAcc(acc); setShowAddAcc(true); }}><Pencil size={13} /></button>
                      {confirmDelAcc === acc.id ? (
                        <>
                          <button className="et-icon-btn et-icon-danger" onClick={() => { onDeleteAccount(acc.id); setConfirmDelAcc(null); }}><Check size={13} /></button>
                          <button className="et-icon-btn" onClick={() => setConfirmDelAcc(null)}><X size={13} /></button>
                        </>
                      ) : (
                        <button className="et-icon-btn" onClick={() => setConfirmDelAcc(acc.id)}><Trash2 size={13} /></button>
                      )}
                    </div>
                  </div>
                  <div className="et-acc-card-stats" style={{ borderTop: "1px solid #EDE6D3", paddingTop: 8, marginTop: 8 }}>
                    <span>Opening Date: {fmtDateDisplay(acc.openingDate || todayStr())}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- CATEGORIES SECTION --- */}
        {subTab === "categories" && (
          <div className="et-fade-in">
            <div className="et-section-header">
              <h3 className="et-section-title">Manage Expense Categories</h3>
              <button className="et-btn-outline" onClick={() => setShowAddCat((s) => !s)}><Plus size={14} /> Add Category</button>
            </div>

            {showAddCat && (
              <div className="et-card et-panel" style={{ marginTop: 14, marginBottom: 14 }}>
                <div className="et-filter-row" style={{ flexWrap: "wrap", gap: 10 }}>
                  <input className="et-input" placeholder="Category name" value={catName} onChange={(e) => setCatName(e.target.value)} style={{ minWidth: 180 }} />
                  <div className="et-swatch-row">
                    {COLOR_CHOICES.map((c) => (
                      <button key={c} className={`et-swatch ${catColor === c ? "et-swatch-active" : ""}`} style={{ background: c }} onClick={() => setCatColor(c)} />
                    ))}
                  </div>
                  <div className="et-icon-row">
                    {ICON_CHOICES.map((ic) => (
                      <button key={ic} className={`et-icon-choice ${catIcon === ic ? "et-icon-choice-active" : ""}`} onClick={() => setCatIcon(ic)}>
                        <CategoryIcon icon={ic} color={catIcon === ic ? "#FBF6EC" : "#3a3628"} size={15} />
                      </button>
                    ))}
                  </div>
                  <button className="et-btn-primary" onClick={submitAddCategory}><Check size={14} /> Save Category</button>
                </div>
              </div>
            )}

            <div className="et-cat-grid" style={{ marginTop: 14 }}>
              {categories.filter(c => c.type !== "income").map((c) => {
                const spent = spentThisMonth[c.name] || 0;
                const pct = c.budget > 0 ? Math.min(100, (spent / c.budget) * 100) : 0;
                return (
                  <div key={c.id} className="et-card et-cat-card">
                    <div className="et-cat-card-top">
                      <span className="et-ledger-icon" style={{ background: c.color }}>
                        <CategoryIcon icon={c.icon} color="#FBF6EC" size={15} />
                      </span>
                      <span className="et-cat-card-name">{c.name}</span>
                      {confirmDelCat === c.id ? (
                        <span style={{ display: "flex", gap: 4 }}>
                          <button className="et-icon-btn et-icon-danger" onClick={() => { onDeleteCategory(c.id); setConfirmDelCat(null); }}><Check size={13} /></button>
                          <button className="et-icon-btn" onClick={() => setConfirmDelCat(null)}><X size={13} /></button>
                        </span>
                      ) : (
                        <button className="et-icon-btn" onClick={() => setConfirmDelCat(c.id)}><Trash2 size={13} /></button>
                      )}
                    </div>
                    <div className="et-filter-row" style={{ marginTop: 14 }}>
                      <span className="et-budget-label">Monthly budget</span>
                      <input
                        type="number" className="et-input" style={{ width: 110 }} placeholder="Not set"
                        value={c.budget || ""} onChange={(e) => onBudgetCategory(c.id, Number(e.target.value) || 0)}
                      />
                    </div>
                    {c.budget > 0 && (
                      <div className="et-progress-track" style={{ marginTop: 8 }}>
                        <div className="et-progress-fill" style={{ width: `${pct}%`, background: spent > c.budget ? "#A63A2E" : c.color }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- INCOME CATEGORIES SECTION --- */}
        {subTab === "income_categories" && (
          <div className="et-fade-in">
            <div className="et-section-header">
              <h3 className="et-section-title">Manage Income Categories</h3>
              <button className="et-btn-outline" onClick={() => setShowAddCat((s) => !s)}><Plus size={14} /> Add Category</button>
            </div>

            {showAddCat && (
              <div className="et-card et-panel" style={{ marginTop: 14, marginBottom: 14 }}>
                <div className="et-filter-row" style={{ flexWrap: "wrap", gap: 10 }}>
                  <input className="et-input" placeholder="Source name" value={catName} onChange={(e) => setCatName(e.target.value)} style={{ minWidth: 180 }} />
                  <div className="et-swatch-row">
                    {COLOR_CHOICES.map((c) => (
                      <button key={c} className={`et-swatch ${catColor === c ? "et-swatch-active" : ""}`} style={{ background: c }} onClick={() => setCatColor(c)} />
                    ))}
                  </div>
                  <div className="et-icon-row">
                    {ICON_CHOICES.map((ic) => (
                      <button key={ic} className={`et-icon-choice ${catIcon === ic ? "et-icon-choice-active" : ""}`} onClick={() => setCatIcon(ic)}>
                        <CategoryIcon icon={ic} color={catIcon === ic ? "#FBF6EC" : "#3a3628"} size={15} />
                      </button>
                    ))}
                  </div>
                  <button className="et-btn-primary" onClick={submitAddCategory}><Check size={14} /> Save Category</button>
                </div>
              </div>
            )}

            <div className="et-cat-grid" style={{ marginTop: 14 }}>
              {categories.filter(c => c.type === "income").map((c) => {
                return (
                  <div key={c.id} className="et-card et-cat-card">
                    <div className="et-cat-card-top">
                      <span className="et-ledger-icon" style={{ background: c.color }}>
                        <CategoryIcon icon={c.icon} color="#FBF6EC" size={15} />
                      </span>
                      <span className="et-cat-card-name">{c.name}</span>
                      {confirmDelCat === c.id ? (
                        <span style={{ display: "flex", gap: 4 }}>
                          <button className="et-icon-btn et-icon-danger" onClick={() => { onDeleteCategory(c.id); setConfirmDelCat(null); }}><Check size={13} /></button>
                          <button className="et-icon-btn" onClick={() => setConfirmDelCat(null)}><X size={13} /></button>
                        </span>
                      ) : (
                        <button className="et-icon-btn" onClick={() => setConfirmDelCat(c.id)}><Trash2 size={13} /></button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- FAMILY SECTION --- */}
        {subTab === "family" && (
          <div className="et-fade-in">
            <div className="et-section-header">
              <h3 className="et-section-title">Manage Family Members</h3>
              <button className="et-btn-outline" onClick={() => { setEditingFam({}); setShowAddFam(true); }}><Plus size={14} /> Add Member</button>
            </div>

            {familyMembers.length === 0 ? (
              <div style={{ marginTop: 14 }}>
                <EmptyState text="No family members added" sub="Create members here to select them in family transfers." />
              </div>
            ) : (
              <div className="et-people-grid" style={{ marginTop: 14 }}>
                {familyMembers.map((f) => {
                  const initials = f.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                  return (
                    <div key={f.id} className="et-card et-people-card">
                      <div className="et-people-avatar" style={{ background: f.color || "#6B2737" }}>{initials}</div>
                      <div className="et-people-info">
                        <div className="et-people-name">{f.name}</div>
                        {f.relation && <div className="et-people-rel">{f.relation}</div>}
                        {f.phone && <div className="et-people-phone" style={{ display: "flex", alignItems: "center", gap: 3 }}><Phone size={10} /> {f.phone}</div>}
                      </div>
                      <div className="et-people-actions">
                        <button className="et-icon-btn" onClick={() => { setEditingFam(f); setShowAddFam(true); }}><Pencil size={13} /></button>
                        {confirmDelFam === f.id ? (
                          <>
                            <button className="et-icon-btn et-icon-danger" onClick={() => { onDeleteFamily(f.id); setConfirmDelFam(null); }}><Check size={13} /></button>
                            <button className="et-icon-btn" onClick={() => setConfirmDelFam(null)}><X size={13} /></button>
                          </>
                        ) : (
                          <button className="et-icon-btn" onClick={() => setConfirmDelFam(f.id)}><Trash2 size={13} /></button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- DATA BACKUP & SYNC --- */}
        {subTab === "data" && (
          <div className="et-fade-in">
            <h3 className="et-section-title">Data Backup (JSON)</h3>
            <div className="et-card et-panel" style={{ marginTop: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#8a7040", fontSize: 13, background: "#FFF8EC", padding: 12, borderRadius: 6, marginBottom: 16 }}>
                <Info size={16} />
                <span>All modifications are saved instantly to the local <strong>Khata/data/</strong> folder on your machine. Export JSON backups for full application restoration.</span>
              </div>
              <div className="et-filter-row" style={{ flexWrap: "wrap", gap: 10 }}>
                <button className="et-btn-outline" onClick={onExportBackup}><Download size={14} /> Export Backup (JSON)</button>
                <label className="et-btn-outline" style={{ cursor: "pointer" }}>
                  <Upload size={14} /> Import Backup (JSON)
                  <input type="file" accept=".json" style={{ display: "none" }} onChange={(e) => { if (e.target.files[0]) onImportBackup(e.target.files[0]); }} />
                </label>
              </div>
            </div>

            <h3 className="et-section-title" style={{marginTop: 32}}>CSV Export & Import</h3>
            <div className="et-card et-panel" style={{ marginTop: 14 }}>
              <div className="et-filter-row" style={{ flexWrap: "wrap", gap: 10 }}>
                <button className="et-btn-outline" onClick={onExportExpensesCSV}><Download size={14} /> Export Expenses (CSV)</button>
                <button className="et-btn-outline" onClick={onExportTransfersCSV}><Download size={14} /> Export Transfers (CSV)</button>
                <label className="et-btn-outline" style={{ cursor: "pointer", background: "#F5EFDF" }}>
                  <Upload size={14} /> Import Expenses (CSV)
                  <input type="file" accept=".csv" style={{ display: "none" }} onChange={(e) => { if (e.target.files[0]) onImportCSV(e.target.files[0]); }} />
                </label>
              </div>
              <p style={{fontSize: 12, color: "#8a8574", marginTop: 12}}>
                Ensure your CSV has the following columns (no header required, just order): <br/>
                <code>Date, Category, Amount, AccountName, Method, Note</code>
              </p>
            </div>

            <h3 className="et-section-title" style={{marginTop: 32}}>Danger Zone</h3>
            <div className="et-card et-panel" style={{ marginTop: 14, borderColor: "#ECAAA2" }}>
              <div className="et-filter-row" style={{ flexWrap: "wrap", gap: 10 }}>
                {confirmResetOpen ? (
                  <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span className="et-empty-sub" style={{ display: "flex", alignItems: "center", gap: 4 }}><AlertCircle size={14} color="#A63A2E" /> Clear all ledger entries permanently?</span>
                    <button className="et-icon-btn et-icon-danger" onClick={onReset}><Check size={14} /></button>
                    <button className="et-icon-btn" onClick={() => setConfirmResetOpen(false)}><X size={14} /></button>
                  </span>
                ) : (
                  <button className="et-btn-outline" style={{color: "#A63A2E", borderColor: "#ECAAA2"}} onClick={() => setConfirmResetOpen(true)}><RotateCcw size={14} /> Reset Ledger</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Internal Modal wrappers inside settings */}
      {showAddAcc && (
        <AccountFormModal
          initial={editingAcc}
          onClose={() => { setShowAddAcc(false); setEditingAcc(null); }}
          onSave={(p) => { onSaveAccount(p); setShowAddAcc(false); setEditingAcc(null); }}
        />
      )}

      {showAddFam && (
        <FamilyMemberModal
          initial={editingFam}
          onClose={() => { setShowAddFam(false); setEditingFam(null); }}
          onSave={(p) => { onSaveFamily(p); setShowAddFam(false); setEditingFam(null); }}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Family Member Modal                                                     */
/* ---------------------------------------------------------------------- */
function FamilyMemberModal({initial,onClose,onSave}){
  const RELATION_OPTIONS_EXCLUDING_OTHER = ["Spouse","Father","Mother","Son","Daughter","Brother","Sister","Friend"];
  
  const isNew=!initial?.id;
  const [name,setName]=useState(initial?.name||"");
  
  const isCustomRelation = initial?.relation && !RELATION_OPTIONS_EXCLUDING_OTHER.includes(initial.relation);
  const [selectedRelation, setSelectedRelation] = useState(isCustomRelation ? "Other" : (initial?.relation || ""));
  const [customRelation, setCustomRelation] = useState(isCustomRelation ? initial.relation : "");
  
  const [phone,setPhone]=useState(initial?.phone||"");
  const [color,setColor]=useState(initial?.color||ACCOUNT_COLORS[Math.floor(Math.random()*ACCOUNT_COLORS.length)]);
  const [error,setError]=useState("");

  function submit(){
    if(!name.trim())return setError("Enter a name.");
    const rel = selectedRelation === "Other" ? customRelation.trim() : selectedRelation;
    if(selectedRelation === "Other" && !rel) return setError("Enter the custom relation.");
    setError("");
    onSave({id:initial?.id,name:name.trim(),relation:rel,phone:phone.trim(),color});
  }

  return(
    <div className="et-modal-backdrop" onClick={onClose}>
      <div className="et-modal" onClick={e=>e.stopPropagation()} style={{maxWidth:420}}>
        <div className="et-modal-head">
          <h2 className="et-font-display et-modal-title">{isNew?"Add family member":"Edit member"}</h2>
          <button className="et-icon-btn" onClick={onClose}><X size={17}/></button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <label className="et-field"><span>Name</span>
            <input className="et-input" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Amma"/>
          </label>
          <label className="et-field"><span>Relation</span>
            <select className="et-input" value={selectedRelation} onChange={e=>{
              setSelectedRelation(e.target.value);
              if(e.target.value !== "Other") {
                setCustomRelation("");
              }
            }}>
              <option value="">— Select —</option>
              {RELATION_OPTIONS_EXCLUDING_OTHER.map(r=><option key={r} value={r}>{r}</option>)}
              <option value="Other">Other</option>
            </select>
          </label>
          {selectedRelation === "Other" && (
            <label className="et-field"><span>Please specify relation</span>
              <input className="et-input" value={customRelation} onChange={e=>setCustomRelation(e.target.value)} placeholder="e.g. Cousin, Uncle, Colleague"/>
            </label>
          )}
          <label className="et-field"><span>Phone (optional)</span>
            <input className="et-input" placeholder="+91 9999..." value={phone} onChange={e=>setPhone(e.target.value)}/>
          </label>
          <label className="et-field"><span>Colour</span>
            <div className="et-swatch-row"style={{marginTop:4}}>
              {ACCOUNT_COLORS.map(c=>(
                <button key={c} className={`et-swatch${color===c?" et-swatch-active":""}`} style={{background:c}} onClick={()=>setColor(c)}/>
              ))}
            </div>
          </label>
        </div>
        {error&&<div className="et-form-error"><AlertCircle size={14}/> {error}</div>}
        <div className="et-modal-actions">
          <button className="et-btn-outline" onClick={onClose}>Cancel</button>
          <button className="et-btn-primary" onClick={submit}><Check size={15}/> {isNew?"Add member":"Save"}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Transfer Modal                                                          */
/* ---------------------------------------------------------------------- */
function TransferModal({accounts,familyMembers,initial,onClose,onSave}){
  const isNew=!initial?.id;
  const [txType,setTxType]=useState(initial?.type||"internal");
  const [date,setDate]=useState(initial?.date||todayStr());
  const [amount,setAmount]=useState(initial?String(initial.amount):"");
  const [fromAccountId,setFromAccountId]=useState(initial?.fromAccountId||(accounts[0]?.id||""));
  const [toAccountId,setToAccountId]=useState(initial?.toAccountId||(accounts[1]?.id||accounts[0]?.id||""));
  const [familyMemberId,setFamilyMemberId]=useState(initial?.familyMemberId||"");
  const [familyTxDirection, setFamilyTxDirection] = useState(
    initial?.type === "family" && initial?.toAccountId && !initial?.fromAccountId ? "received" : "sent"
  );
  const [note,setNote]=useState(initial?.note||"");
  const [error,setError]=useState("");

  function submit(){
    const amt=parseFloat(amount);
    if(!date)return setError("Pick a date.");
    if(!amt||amt<=0)return setError("Enter a valid amount.");
    
    if(txType==="family") {
      if(!familyMemberId)return setError("Select a family member.");
      if(familyTxDirection==="sent"&&!fromAccountId)return setError("Choose a source account.");
      if(familyTxDirection==="received"&&!toAccountId)return setError("Choose a destination account.");
    } else {
      if(txType!=="liability"&&!fromAccountId)return setError("Choose a source account.");
      if(txType==="liability"&&!toAccountId)return setError("Choose a destination account.");
      if(txType==="internal"&&(!toAccountId||toAccountId===fromAccountId))return setError("Choose a different destination account.");
    }

    setError("");
    onSave({
      id:initial?.id, type:txType, date, amount:amt,
      fromAccountId:(txType==="liability"||(txType==="family"&&familyTxDirection==="received"))?undefined:fromAccountId,
      toAccountId:(txType==="internal"||txType==="liability"||(txType==="family"&&familyTxDirection==="received"))?toAccountId:undefined,
      familyMemberId:txType==="family"?familyMemberId:undefined,
      note:note.trim(),
      refundedAmount:initial?.refundedAmount||0,
      refundDate:initial?.refundDate||null,
      spentAmount:initial?.spentAmount||0,
      status:initial?.status||((txType==="refundable"||txType==="liability")?"pending":null),
    });
  }

  return(
    <div className="et-modal-backdrop" onClick={onClose}>
      <div className="et-modal" onClick={e=>e.stopPropagation()} style={{maxWidth:600}}>
        <div className="et-modal-head">
          <h2 className="et-font-display et-modal-title">{isNew?"New transfer":"Edit transfer"}</h2>
          <button className="et-icon-btn" onClick={onClose}><X size={17}/></button>
        </div>
        <div className="et-txf-type-row" style={{flexWrap: "wrap"}}>
          {[
            {id:"internal",icon:<ArrowRightLeft size={14}/>,label:"Internal"},
            {id:"family",icon:<Users size={14}/>,label:"Family"},
            {id:"refundable",icon:<RefreshCcw size={14}/>,label:"Refundable"},
            {id:"liability",icon:<Download size={14}/>,label:"Liability"},
          ].map(t=>(
            <button key={t.id} className={`et-txf-type-btn${txType===t.id?" et-txf-type-active":""}`} onClick={()=>setTxType(t.id)}>
              {t.icon}<span>{t.label}</span>
            </button>
          ))}
        </div>
        <div className="et-txf-type-desc">
          {txType==="internal"&&"Moves money between your own accounts. Net worth stays the same."}
          {txType==="family"&&"Track money sent to or received from a family member. Doesn't appear in regular expenses."}
          {txType==="refundable"&&"A payment you expect to get back. Tracked as a pending refund."}
          {txType==="liability"&&"Money received that you owe back or need to spend on their behalf."}
        </div>
        <div className="et-form-grid"style={{marginTop:16}}>
          <label className="et-field"><span>Date</span>
            <input type="date" className="et-input" value={date} onChange={e=>setDate(e.target.value)} max={todayStr()}/>
          </label>
          <label className="et-field"><span>Amount (₹)</span>
            <input type="number" step="0.01" min="0" className="et-input et-font-mono" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)}/>
          </label>
          
          {txType==="family" && (
            <div className="et-field" style={{gridColumn: "1 / -1", display: "flex", gap: 16, marginBottom: 4, background: "#F5EFDF", padding: "8px 12px", borderRadius: 6}}>
              <label style={{display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, fontWeight: 500}}>
                <input type="radio" name="famDir" checked={familyTxDirection==="sent"} onChange={()=>setFamilyTxDirection("sent")}/> Sent to Family
              </label>
              <label style={{display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, fontWeight: 500}}>
                <input type="radio" name="famDir" checked={familyTxDirection==="received"} onChange={()=>setFamilyTxDirection("received")}/> Received from Family
              </label>
            </div>
          )}

          {(txType==="liability" || (txType==="family" && familyTxDirection==="received"))?(
            <label className="et-field"><span>To account (Received in)</span>
              <select className="et-input" value={toAccountId} onChange={e=>setToAccountId(e.target.value)}>
                {accounts.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </label>
          ):(
            <label className="et-field"><span>From account</span>
              <select className="et-input" value={fromAccountId} onChange={e=>setFromAccountId(e.target.value)}>
                {accounts.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </label>
          )}

          {txType==="internal"&&(
            <label className="et-field"><span>To account</span>
              <select className="et-input" value={toAccountId} onChange={e=>setToAccountId(e.target.value)}>
                {accounts.filter(a=>a.id!==fromAccountId).map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </label>
          )}
          {txType==="family"&&(
            <label className="et-field"><span>{familyTxDirection==="received" ? "From" : "To"} (family member)</span>
              <select className="et-input" value={familyMemberId} onChange={e=>setFamilyMemberId(e.target.value)}>
                <option value="">— Select —</option>
                {familyMembers.map(f=><option key={f.id} value={f.id}>{f.name}{f.relation?` (${f.relation})`:""}</option>)}
              </select>
            </label>
          )}
          <label className="et-field"style={{gridColumn:"1 / -1"}}><span>Note (optional)</span>
            <input className="et-input" placeholder={txType==="refundable"?"e.g. Security deposit":txType==="liability"?"e.g. Funds from John":txType==="family"?"e.g. Monthly support":"e.g. Moving savings"} value={note} onChange={e=>setNote(e.target.value)}/>
          </label>
        </div>
        {error&&<div className="et-form-error"><AlertCircle size={14}/> {error}</div>}
        <div className="et-modal-actions">
          <button className="et-btn-outline" onClick={onClose}>Cancel</button>
          <button className="et-btn-primary" onClick={submit}><Check size={15}/> {isNew?"Record transfer":"Save changes"}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Transactions View                                                       */
/* ---------------------------------------------------------------------- */
function TransactionsView(props){
  const{rows,total,categories,accounts,transfers,search,setSearch,category,setCategory,account,setAccount,
    preset,setPreset,specificMonth,setSpecificMonth,customStart,setCustomStart,customEnd,setCustomEnd,
    sort,setSort,onEdit,onArmDelete,onConfirmDelete,confirmDeleteId,onExport}=props;

  // Group rows by month
  const groups = {};
  rows.forEach(e => {
    const dateParts = e.date.split("-");
    const year = dateParts[0];
    const monthIndex = parseInt(dateParts[1]) - 1;
    const monthYearKey = `${year}-${dateParts[1]}`;
    const label = `${MONTH_NAMES[monthIndex]} ${year}`;
    
    if (!groups[monthYearKey]) {
      groups[monthYearKey] = {
        key: monthYearKey,
        label: label,
        year: parseInt(year),
        month: monthIndex,
        items: []
      };
    }
    groups[monthYearKey].items.push(e);
  });

  const sortedGroups = Object.values(groups).sort((a, b) => {
    if (sort === "date_asc") {
      return a.key > b.key ? 1 : -1;
    }
    return a.key < b.key ? 1 : -1;
  });

  return(
    <div className="et-fade-in">
      <header className="et-page-header et-page-header-row">
        <div>
          <h1 className="et-font-display et-page-title">Transactions</h1>
          <p className="et-page-sub">{rows.length} {rows.length===1?"entry":"entries"} &middot; total {fmtINR(total)}</p>
        </div>
        <button className="et-btn-outline" onClick={onExport}><Download size={15}/> Export CSV</button>
      </header>
      <div className="et-card et-filters">
        <div className="et-filter-presets">
          {GLOBAL_PERIOD_PRESETS.map(p=><button key={p.id} className={`et-chip${preset===p.id?" et-chip-active":""}`} onClick={()=>setPreset(p.id)}>{p.label}</button>)}
        </div>
        {preset==="custom"&&(
          <div className="et-filter-row">
            <input type="date" className="et-input" value={customStart} onChange={e=>setCustomStart(e.target.value)}/>
            <span className="et-arrow-sep">&rarr;</span>
            <input type="date" className="et-input" value={customEnd} onChange={e=>setCustomEnd(e.target.value)}/>
          </div>
        )}
        {preset==="specificMonth"&&(
          <div className="et-filter-row">
            <input type="month" className="et-input" value={specificMonth} onChange={e=>setSpecificMonth(e.target.value)}/>
          </div>
        )}
        <div className="et-filter-row">
          <div className="et-search-wrap">
            <Search size={14}color="#8a8574"/>
            <input className="et-input et-input-plain" placeholder="Search category or note" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <select className="et-input" value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <select className="et-input" value={account} onChange={e=>setAccount(e.target.value)}>
            <option value="all">All accounts</option>
            {accounts.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <select className="et-input" value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="date_desc">Newest first</option>
            <option value="date_asc">Oldest first</option>
            <option value="amount_desc">Amount: high to low</option>
            <option value="amount_asc">Amount: low to high</option>
          </select>
        </div>
      </div>
      
      {sortedGroups.length===0 ? (
        <div className="et-card et-panel" style={{marginTop:16}}>
          <EmptyState text="No entries match these filters" sub="Widen the date range or clear the search."/>
        </div>
      ) : (
        sortedGroups.map(group => {
          const incSum = group.items.reduce((s, e) => s + (e.entryType === "income" ? Number(e.amount||0) : 0), 0);
          const outSum = group.items.reduce((s, e) => s + (e.entryType === "income" ? 0 : Number(e.amount||0)), 0);
          
          const monthStart = new Date(group.year, group.month, 1);
          const monthEnd = new Date(group.year, group.month + 1, 0);
          const familySum = (transfers || [])
            .filter(t => t.type === "family")
            .filter(t => {
              const td = parseDateStr(t.date);
              const inDate = td >= monthStart && td <= monthEnd;
              if (!inDate) return false;
              if (account !== "all" && t.fromAccountId !== account) return false;
              return true;
            })
            .reduce((sum, t) => sum + Number(t.amount || 0), 0);

          return (
            <div key={group.key} className="et-card" style={{marginTop:18, overflow:"hidden"}}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#EADFD3",
                padding: "10px 16px",
                borderBottom: "1px solid #DDD1B8",
                flexWrap: "wrap",
                gap: 8
              }}>
                <span style={{fontWeight: 600, color: "#3a2416"}}>{group.label}</span>
                <div style={{fontSize: 12, color: "#5c563f", display: "flex", gap: 14, flexWrap: "wrap"}}>
                  <span>Income: <strong className="et-amt-credit">+{fmtINR(incSum)}</strong></span>
                  <span>Outflow: <strong className="et-amt-debit">-{fmtINR(outSum)}</strong></span>
                  {familySum > 0 && <span>Family Transfers: <strong style={{color: "#33608A"}}>-{fmtINR(familySum)}</strong></span>}
                </div>
              </div>
              <div className="et-panel" style={{padding: 0}}>
                <div className="et-table">
                  <div className="et-table-head" style={{borderBottom: "1px solid #E3DBC6", background: "rgba(251,246,236,0.5)"}}>
                    <span>Date</span><span>Category</span><span>Note</span><span>Account</span><span className="et-right">Amount</span><span></span>
                  </div>
                  {group.items.map(e=>{
                    const cat=categories.find(c=>c.name===e.category);
                    const acc=accounts.find(a=>a.id===e.accountId);
                    return(
                      <div key={e.id} className="et-table-row">
                        <span className="et-font-mono et-table-date">{fmtDateDisplay(e.date)}</span>
                        <span className="et-table-cat"><span className="et-cat-dot"style={{background:(cat&&cat.color)||"#8a8574"}}/>{e.category}</span>
                        <span className="et-table-note">{e.note||"\u2014"}</span>
                        <span className="et-table-acc"style={{color:acc?acc.color:"#8a8574"}}>{acc?acc.name:"\u2014"}</span>
                        <span className={`et-right et-font-mono ${e.entryType === "income" ? "et-amt-credit" : "et-amt-debit"}`}>
                          {e.entryType === "income" ? "+" : ""}{fmtINR(e.amount)}
                        </span>
                        <span className="et-table-actions">
                          <button className="et-icon-btn" onClick={()=>onEdit(e)}><Pencil size={14}/></button>
                          {confirmDeleteId===e.id?(
                            <>
                              <button className="et-icon-btn et-icon-danger" onClick={()=>onConfirmDelete(e.id)}><Check size={14}/></button>
                              <button className="et-icon-btn" onClick={()=>onArmDelete(null)}><X size={14}/></button>
                            </>
                          ):(
                            <button className="et-icon-btn" onClick={()=>onArmDelete(e.id)}><Trash2 size={14}/></button>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* ---------------------------------------------------------------------- */
/* Transfers View                                                          */
/* ---------------------------------------------------------------------- */
function TransfersView({transfers, accounts, familyMembers, accById, onEditTransfer, onDeleteTransfer}) {
  const [filterType, setFilterType] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return transfers
      .filter(t => {
        if (filterType !== "all" && t.type !== filterType) return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          const noteMatch = (t.note || "").toLowerCase().includes(q);
          const fromAcc = (accById[t.fromAccountId]?.name || "").toLowerCase().includes(q);
          const toAcc = (accById[t.toAccountId]?.name || "").toLowerCase().includes(q);
          const member = t.familyMemberId ? (familyMembers.find(f => f.id === t.familyMemberId)?.name || "").toLowerCase().includes(q) : false;
          return noteMatch || fromAcc || toAcc || member;
        }
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [transfers, filterType, search, accById, familyMembers]);

  return (
    <div className="et-fade-in">
      <header className="et-page-header et-page-header-row">
        <div>
          <h1 className="et-font-display et-page-title">Transfers Ledger</h1>
          <p className="et-page-sub">Track internal transfers, family support, refundable deposits, and liabilities.</p>
        </div>
      </header>

      <div className="et-card et-filters" style={{display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap"}}>
        <div className="et-search-wrap" style={{flex: 1, minWidth: 200, maxWidth: 300}}>
          <Search size={14} color="#8a8574"/>
          <input className="et-input et-input-plain" placeholder="Search note, accounts, family..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select className="et-input" value={filterType} onChange={e=>setFilterType(e.target.value)} style={{width: 160}}>
          <option value="all">All Types</option>
          <option value="internal">Internal Transfers</option>
          <option value="family">Family Support</option>
          <option value="refundable">Refundable</option>
          <option value="liability">Liabilities</option>
        </select>
      </div>

      <div className="et-card et-panel" style={{marginTop: 18, padding: 0}}>
        {filtered.length === 0 ? (
          <EmptyState text="No transfers found" sub="Use the 'Transfer' button in the sidebar to log a new transfer."/>
        ) : (
          <div className="et-table">
            <div className="et-table-head" style={{borderBottom: "1px solid #E3DBC6", background: "rgba(251,246,236,0.5)"}}>
              <span>Date</span>
              <span>Type</span>
              <span>Flow / Details</span>
              <span>Note</span>
              <span className="et-right">Amount</span>
              <span>Actions</span>
            </div>
            {filtered.map(t => {
              let flowText = "";
              const fromAcc = accById[t.fromAccountId]?.name || "—";
              const toAcc = accById[t.toAccountId]?.name || "—";
              
              let isPositive = false;
              let isNeutral = false;

              if (t.type === "internal") {
                flowText = `${fromAcc} → ${toAcc}`;
                isNeutral = true;
              } else if (t.type === "family") {
                const member = familyMembers.find(f => f.id === t.familyMemberId)?.name || "Family Member";
                if (t.toAccountId) {
                  flowText = `${member} → ${toAcc}`;
                  isPositive = true;
                } else {
                  flowText = `${fromAcc} → ${member}`;
                }
              } else if (t.type === "refundable") {
                flowText = `${fromAcc} (Refundable)`;
              } else if (t.type === "liability") {
                flowText = `Received in ${toAcc}`;
                isPositive = true;
              }

              return (
                <React.Fragment key={t.id}>
                  <div className="et-table-row">
                    <span className="et-font-mono et-table-date">{fmtDateDisplay(t.date)}</span>
                    <span><TransferBadge type={t.type}/></span>
                    <span style={{fontWeight: 500}}>{flowText}</span>
                    <span className="et-table-note">{t.note || "—"}</span>
                    <span className="et-right et-font-mono" style={{fontWeight: 600, color: isPositive ? "#2F6B4F" : isNeutral ? "#6b6654" : "#A63A2E"}}>
                      {isPositive ? "+" : isNeutral ? "" : "-"}{fmtINR(t.amount)}
                    </span>
                    <span className="et-table-actions">
                      <button className="et-icon-btn" onClick={() => onEditTransfer(t)} title="Edit"><Pencil size={14}/></button>
                      <button className="et-icon-btn et-icon-danger" onClick={() => {if(confirm(`Delete this transfer?`)) onDeleteTransfer(t.id)}} title="Delete"><Trash2 size={14}/></button>
                    </span>
                  </div>
                  
                  {/* Nested row for Refunded amounts */}
                  {t.type === "refundable" && t.status === "refunded" && (
                    <div className="et-table-row" style={{background: "rgba(251,246,236,0.5)", borderLeft: "3px solid #2F6B4F", borderBottom: "1px dashed #E3DBC6"}}>
                      <span className="et-font-mono et-table-date" style={{paddingLeft: 12}}>{fmtDateDisplay(t.refundDate || t.date)}</span>
                      <span><span className="et-badge et-badge-internal" style={{background: "transparent", padding: 0}}>✓ Refunded</span></span>
                      <span style={{fontWeight: 500, color: "#2F6B4F"}}>
                        {t.refundMode === "other" ? "Refunded (Other)" : `Refunded to ${accById[t.refundAccountId || t.fromAccountId]?.name || "Account"}`}
                      </span>
                      <span className="et-table-note">{t.refundNote || "—"}</span>
                      <span className="et-right et-font-mono" style={{fontWeight: 600, color: "#2F6B4F"}}>
                        +{fmtINR(t.refundedAmount)}
                      </span>
                      <span className="et-table-actions"></span>
                    </div>
                  )}

                  {/* Nested row for Settled Liabilities */}
                  {t.type === "liability" && t.status === "settled" && (
                    <div className="et-table-row" style={{background: "rgba(251,246,236,0.5)", borderLeft: "3px solid #A63A2E", borderBottom: "1px dashed #E3DBC6"}}>
                      <span className="et-font-mono et-table-date" style={{paddingLeft: 12}}>{fmtDateDisplay(t.date)}</span>
                      <span><span className="et-badge" style={{background: "transparent", padding: 0, color: "#6b6654"}}>✓ Settled</span></span>
                      <span style={{fontWeight: 500, color: "#A63A2E"}}>Funds spent / returned</span>
                      <span className="et-table-note">—</span>
                      <span className="et-right et-font-mono" style={{fontWeight: 600, color: "#A63A2E"}}>
                        -{fmtINR(t.spentAmount)}
                      </span>
                      <span className="et-table-actions"></span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Budgets View                                                           */
/* ---------------------------------------------------------------------- */
function BudgetsView({categories, expenses, onBudgetCategory}){
  const [targetMonth, setTargetMonth] = useState(todayStr().substring(0, 7)); // YYYY-MM
  const [editingCatId, setEditingCatId] = useState(null);
  const [budgetInput, setBudgetInput] = useState("");

  const monthStart = parseDateStr(targetMonth + "-01");
  const monthEnd = endOfMonth(monthStart);

  // Compute spending per expense category
  const expenseCats = categories.filter(c => c.type !== "income");
  const spending = {};
  expenses.forEach(e => {
    if (e.entryType === "income") return;
    const d = parseDateStr(e.date);
    if (d >= monthStart && d <= monthEnd) {
      spending[e.category] = (spending[e.category] || 0) + Number(e.amount || 0);
    }
  });

  // Sort categories: Budgeted first, then unbudgeted by spending, then others
  const sortedCats = [...expenseCats].sort((a, b) => {
    const aBud = Number(a.budget || 0);
    const bBud = Number(b.budget || 0);
    if (aBud > 0 && bBud === 0) return -1;
    if (bBud > 0 && aBud === 0) return 1;
    const aSpent = spending[a.name] || 0;
    const bSpent = spending[b.name] || 0;
    return bSpent - aSpent;
  });

  function saveBudget(id) {
    onBudgetCategory(id, Number(budgetInput) || 0);
    setEditingCatId(null);
  }

  return (
    <div className="et-fade-in">
      <header className="et-page-header" style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12}}>
        <div>
          <h1 className="et-font-display et-page-title">Budgets &amp; Envelopes</h1>
          <p className="et-page-sub">Track category limits for the month.</p>
        </div>
        <div>
          <input type="month" className="et-input" value={targetMonth} onChange={e=>setTargetMonth(e.target.value)} />
        </div>
      </header>

      <div className="et-panel">
        {sortedCats.map(c => {
          const spent = spending[c.name] || 0;
          const bud = Number(c.budget || 0);
          const isOver = bud > 0 && spent > bud;
          const pct = bud > 0 ? Math.min((spent / bud) * 100, 100) : 0;
          
          return (
            <div key={c.id} style={{padding: "16px", borderBottom: "1px solid #E3DBC6"}}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8}}>
                <div style={{display: "flex", alignItems: "center", gap: 8}}>
                  <div className="et-cat-dot" style={{background: c.color}}/>
                  <span style={{fontWeight: 600, color: "#2A2A20"}}>{c.name}</span>
                </div>
                {editingCatId === c.id ? (
                  <div style={{display: "flex", gap: 6, alignItems: "center"}}>
                    <input type="number" className="et-input et-font-mono" style={{width: 100, padding: "4px 8px"}} value={budgetInput} onChange={e=>setBudgetInput(e.target.value)} placeholder="0.00"/>
                    <button className="et-icon-btn" style={{color: "#2F6B4F"}} onClick={()=>saveBudget(c.id)}><Check size={16}/></button>
                    <button className="et-icon-btn" onClick={()=>setEditingCatId(null)}><X size={16}/></button>
                  </div>
                ) : (
                  <div style={{display: "flex", gap: 12, alignItems: "center"}}>
                    <span className="et-font-mono" style={{fontSize: 14, color: isOver ? "#A63A2E" : "#2A2A20"}}>
                      {fmtINR(spent)} {bud > 0 && <span style={{color: "#8a8574"}}> / {fmtINRCompact(bud)}</span>}
                    </span>
                    <button className="et-icon-btn" onClick={()=>{setEditingCatId(c.id); setBudgetInput(bud ? String(bud) : "");}}>
                      <Pencil size={14}/>
                    </button>
                  </div>
                )}
              </div>
              
              {bud > 0 ? (
                <div style={{height: 8, background: "#E8E2D2", borderRadius: 4, overflow: "hidden", position: "relative"}}>
                  <div style={{height: "100%", width: `${pct}%`, background: isOver ? "#A63A2E" : "#33608A", transition: "width 0.3s ease"}}/>
                </div>
              ) : (
                <div style={{fontSize: 12, color: "#8a8574"}}>
                  No budget set. <a href="#" style={{color: "#33608A"}} onClick={(e)=>{e.preventDefault(); setEditingCatId(c.id); setBudgetInput("");}}>Set a limit</a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Reports View                                                            */
/* ---------------------------------------------------------------------- */
function ReportsView(props){
  const{range,preset,setPreset,specificMonth,setSpecificMonth,customStart,setCustomStart,customEnd,setCustomEnd,
    repType,setRepType,total,catData,methodData,trendData,topExpenses,avgPerDay,dayCount,onExport}=props;
  const isInc = repType === "income";

  return(
    <div className="et-fade-in">
      <header className="et-page-header et-page-header-row">
        <div><h1 className="et-font-display et-page-title">Analytics &amp; Insights</h1><p className="et-page-sub">{range.label}</p></div>
        <div style={{display: "flex", gap: 10, alignItems: "center"}}>
          <div className="et-txf-type-row" style={{margin: 0}}>
            <button className={`et-txf-type-btn${!isInc?" et-txf-type-active":""}`} onClick={()=>setRepType("expense")}>Expense</button>
            <button className={`et-txf-type-btn${isInc?" et-txf-type-active":""}`} onClick={()=>setRepType("income")} style={isInc?{background:"#2F6B4F",borderColor:"#2F6B4F"}:{}}>Income</button>
          </div>
          <button className="et-btn-outline" onClick={onExport}><Download size={15}/> Export CSV</button>
        </div>
      </header>
      <div className="et-card et-filters">
        <div className="et-filter-presets">
          {GLOBAL_PERIOD_PRESETS.map(p=><button key={p.id} className={`et-chip${preset===p.id?" et-chip-active":""}`} onClick={()=>setPreset(p.id)}>{p.label}</button>)}
        </div>
        {preset==="custom"&&(
          <div className="et-filter-row">
            <input type="date" className="et-input" value={customStart} onChange={e=>setCustomStart(e.target.value)}/>
            <span className="et-arrow-sep">&rarr;</span>
            <input type="date" className="et-input" value={customEnd} onChange={e=>setCustomEnd(e.target.value)}/>
          </div>
        )}
        {preset==="specificMonth"&&(
          <div className="et-filter-row">
            <input type="month" className="et-input" value={specificMonth} onChange={e=>setSpecificMonth(e.target.value)}/>
          </div>
        )}
      </div>
      <div className="et-stat-grid"style={{marginTop:16}}>
        <StatCard label={isInc ? "Total earned" : "Total spent"} value={total} icon={<IndianRupee size={16}/>} tint={isInc ? "#2F6B4F" : "#A63A2E"}/>
        <StatCard label={`Avg / day (${dayCount}d)`} value={avgPerDay} icon={<Calendar size={16}/>} tint="#33608A"/>
        <StatCard label="Highest single entry" value={topExpenses[0]?topExpenses[0].amount:0} icon={<BarChart3 size={16}/>} tint="#5F7A3D"/>
        <StatCard label="Top Category" sub={catData[0]?catData[0].name:"-"} value={catData[0]?catData[0].value:0} icon={<TrendingDown size={16}/>} tint="#A9792A"/>
      </div>
      <div className="et-card et-panel"style={{marginTop:16}}>
        <h3 className="et-panel-title">{isInc ? "Income trend" : "Spending trend"}</h3>
        {trendData.every(d=>d.total===0)?<EmptyState text="Nothing recorded in this period"/>:(
          <div style={{width:"100%",height:240}}>
            <ResponsiveContainer>
              <BarChart data={trendData} margin={{top:4,right:8,left:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DDD6C4" vertical={false}/>
                <XAxis dataKey="label" tick={{fontSize:11,fill:"#6b6654"}} axisLine={{stroke:"#DDD6C4"}} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:"#6b6654"}} axisLine={false} tickLine={false} tickFormatter={v=>fmtINRCompact(v)} width={56}/>
                <Tooltip formatter={v=>fmtINR(v)} contentStyle={{fontFamily:"Inter",fontSize:12,border:"1px solid #DDD6C4"}}/>
                <Bar dataKey="total" fill={isInc ? "#2F6B4F" : "#6B2737"} radius={[3,3,0,0]} maxBarSize={34}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="et-dash-grid">
        <div className="et-card et-panel">
          <h3 className="et-panel-title">{isInc ? "Source breakdown" : "Category breakdown"}</h3>
          {catData.length===0?<EmptyState text="No entries in this period"/>:(
            <div style={{display: "flex", flexDirection: "column", gap: 16}}>
              <div style={{width:"100%", height:200, display: "flex", justifyContent: "center"}}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={catData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                      {catData.map((c, i) => <Cell key={`cell-${i}`} fill={c.color} />)}
                    </Pie>
                    <Tooltip formatter={v=>fmtINR(v)} contentStyle={{fontFamily:"Inter",fontSize:12,border:"1px solid #DDD6C4",borderRadius:6}}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="et-cat-report-list">
                {catData.map((c,i)=>(
                  <div key={i} className="et-cat-report-row">
                    <span className="et-ledger-icon"style={{background:c.color}}>
                      <CategoryIcon icon={c.icon} color="#FBF6EC" size={13}/>
                    </span>
                    <div className="et-cat-report-mid">
                      <div className="et-cat-report-top"><span>{c.name}</span><span className="et-font-mono">{fmtINR(c.value)}</span></div>
                      <div className="et-progress-track">
                        <div className="et-progress-fill"style={{width:`${Math.min(100,c.pct)}%`,background:c.color}}/>
                        {!isInc && c.budget>0&&<div className="et-progress-budget-marker"style={{left:`${Math.min(100,(c.budget/(total||1))*100)}%`}}/>}
                      </div>
                      <div className="et-cat-report-sub">{c.pct.toFixed(1)}% of total{!isInc && c.budget>0?` \u00b7 budget ${fmtINRCompact(c.budget)}/mo`:""}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="et-card et-panel">
          <h3 className="et-panel-title">By payment method</h3>
          {methodData.length===0?<EmptyState text="No entries in this period"/>:(
            <div style={{width:"100%",height:220}}>
              <ResponsiveContainer>
                <BarChart data={methodData} layout="vertical" margin={{top:4,right:20,left:0,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#DDD6C4" horizontal={false}/>
                  <XAxis type="number" tick={{fontSize:11,fill:"#6b6654"}} tickFormatter={v=>fmtINRCompact(v)} axisLine={false} tickLine={false}/>
                  <YAxis type="category" dataKey="name" tick={{fontSize:12,fill:"#3a3628"}} width={100} axisLine={false} tickLine={false}/>
                  <Tooltip formatter={v=>fmtINR(v)} contentStyle={{fontFamily:"Inter",fontSize:12,border:"1px solid #DDD6C4"}}/>
                  <Bar dataKey="value" fill="#A9792A" radius={[0,3,3,0]} maxBarSize={20}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
      <div className="et-card et-panel">
        <h3 className="et-panel-title">Top 5 entries this period</h3>
        {topExpenses.length===0?<EmptyState text="No entries in this period"/>:(
          <div className="et-ledger-list">
            {topExpenses.map(e=>(
              <div key={e.id} className="et-ledger-row">
                <span className="et-ledger-mid">
                  <span className="et-ledger-cat">{e.category}</span>
                  <span className="et-ledger-note">{fmtDateDisplay(e.date)}{e.note?` · ${e.note}`:""}</span>
                </span>
                <span className="et-ledger-amt et-font-mono">{fmtINR(e.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Expense Form Modal                                                      */
/* ---------------------------------------------------------------------- */
function ExpenseFormModal({categories,accounts,initial,onClose,onSave,onAddCategory}){
  const [entryType, setEntryType] = useState(initial?.entryType || "expense");
  const [date,setDate] = useState(initial?initial.date:todayStr());
  const [amount,setAmount] = useState(initial?String(initial.amount):"");
  
  const incomeCategories = categories.filter(c => c.type === "income");
  const expenseCategories = categories.filter(c => c.type !== "income");

  const [category,setCategory] = useState(initial?initial.category:(initial?.entryType === "income" ? (incomeCategories[0]?.name || "") : (expenseCategories[0]?.name || "")));
  const [note,setNote] = useState(initial?initial.note||"":"");
  const [accountId,setAccountId] = useState(initial?initial.accountId||"":(accounts[0]?.id||""));
  const [error,setError] = useState("");
  const [showNewCat,setShowNewCat] = useState(false);
  const [newCatName,setNewCatName] = useState("");

  const handleTypeChange = (type) => {
    setEntryType(type);
    if (type === "income") {
      setCategory(incomeCategories[0]?.name || "");
    } else {
      setCategory(expenseCategories[0]?.name || "");
    }
  };

  function submit(){
    const amt=parseFloat(amount);
    if(!date)return setError("Pick a date.");
    if(!amt||amt<=0)return setError("Enter an amount greater than zero.");
    if(!category)return setError("Choose a category.");
    setError("");
    onSave({
      id:initial?initial.id:undefined,
      entryType,
      date,
      amount:amt,
      category,
      note:note.trim(),
      method:"—",
      accountId:accountId||undefined
    });
  }
  function quickAddCat(){
    if(!newCatName.trim())return;
    const color=COLOR_CHOICES[categories.length%COLOR_CHOICES.length];
    onAddCategory({name:newCatName.trim(),color,icon:"MoreHorizontal",budget:0,type:entryType});
    setCategory(newCatName.trim());setNewCatName("");setShowNewCat(false);
  }
  return(
    <div className="et-modal-backdrop" onClick={onClose}>
      <div className="et-modal" onClick={e=>e.stopPropagation()}>
        <div className="et-modal-head">
          <h2 className="font-display et-modal-title">{initial?"Edit entry":"New entry"}</h2>
          <button className="et-icon-btn" onClick={onClose}><X size={17}/></button>
        </div>

        {/* Toggle between Expense and Income */}
        <div className="et-txf-type-row" style={{marginBottom:18}}>
          <button type="button" className={`et-txf-type-btn${entryType==="expense"?" et-txf-type-active":""}`} onClick={()=>handleTypeChange("expense")}>
            <TrendingDown size={14}/><span>Expense</span>
          </button>
          <button type="button" className={`et-txf-type-btn${entryType==="income"?" et-txf-type-active":""}`} onClick={()=>handleTypeChange("income")} style={entryType==="income"?{background:"#2F6B4F",borderColor:"#2F6B4F"}:{}}>
            <ArrowDownLeft size={14}/><span>Income</span>
          </button>
        </div>

        <div className="et-form-grid">
          <label className="et-field"><span>Date</span>
            <input type="date" className="et-input" value={date} onChange={e=>setDate(e.target.value)} max={todayStr()}/>
          </label>
          <label className="et-field"><span>Amount (₹)</span>
            <input type="number" step="0.01" min="0" className="et-input et-font-mono" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)}/>
          </label>
          <label className="et-field"style={{gridColumn:"1 / -1"}}><span>Category / Source</span>
            <select className="et-input" value={category} onChange={e=>setCategory(e.target.value)} style={{width:"100%"}}>
              {(entryType === "income" ? incomeCategories : expenseCategories).map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </label>
          <label className="et-field" style={{gridColumn:"1 / -1"}}><span>Account</span>
            <select className="et-input" value={accountId} onChange={e=>setAccountId(e.target.value)}>
              <option value="">— Unlinked —</option>
              {accounts.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </label>
          <label className="et-field"style={{gridColumn:"1 / -1"}}><span>Note (optional)</span>
            <input className="et-input" placeholder="e.g. Monthly salary, dividends, dinner" value={note} onChange={e=>setNote(e.target.value)}/>
          </label>
        </div>
        {error&&<div className="et-form-error"><AlertCircle size={14}/> {error}</div>}
        <div className="et-modal-actions">
          <button className="et-btn-outline" onClick={onClose}>Cancel</button>
          <button className="et-btn-primary" onClick={submit} style={entryType==="income"?{background:"#2F6B4F"}:{}}><Check size={15}/> {initial?"Save changes":"Record entry"}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Global styles                                                           */
/* ---------------------------------------------------------------------- */
function GlobalStyle(){
  return(
    <style>{`
      html, body { height: 100vh; overflow: hidden; margin: 0; padding: 0; }
      *,*::before,*::after{box-sizing:border-box;}
      .et-app{height:100vh;overflow:hidden;background-color:#FBF6EC;background-image:repeating-linear-gradient(#FBF6EC,#FBF6EC 27px,#E9E2D0 28px);font-family:'Inter',sans-serif;color:#2A2A20;position:relative;}
      .et-font-display{font-family:'Fraunces',serif;}
      .et-font-mono{font-family:'IBM Plex Mono',monospace;}
      .et-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:100vh;}
      .et-loading-stamp{font-family:'Fraunces',serif;font-size:28px;letter-spacing:4px;color:#6B2737;border:3px double #6B2737;border-radius:50%;width:120px;height:120px;display:flex;align-items:center;justify-content:center;transform:rotate(-4deg);animation:stampIn 0.5s ease;}

      /* Storage banner */
      .et-storage-bar{display:flex;align-items:center;gap:8px;padding:8px 20px;font-size:12px;}
      .et-storage-ok{background:#E8F5EE;color:#2F6B4F;border-bottom:1px solid #C3E0CF;}
      .et-storage-warn{background:#FFF8EC;color:#7a5a10;border-bottom:1px solid #E8C96A;}

      .et-shell{display:flex;height:100vh;overflow:hidden;}

      /* Sidebar */
      .et-sidebar{width:230px;flex-shrink:0;background:linear-gradient(180deg,#6B2737,#4A1B27);color:#FBF6EC;display:flex;flex-direction:column;padding:22px 14px;gap:20px;height:100vh;overflow-y:auto;}
      .et-brand{display:flex;align-items:center;gap:10px;padding:0 6px;}
      .et-brand-mark{width:38px;height:38px;border-radius:50%;border:2px solid #C9A227;color:#C9A227;display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-size:18px;flex-shrink:0;}
      .et-brand-name{font-size:19px;line-height:1.1;}
      .et-brand-sub{font-size:11px;color:#D8B9AE;letter-spacing:0.5px;}
      .et-tabs{display:flex;flex-direction:column;gap:4px;flex:1;}
      .et-tab{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:6px 0 0 6px;background:transparent;border:none;color:#EADFD3;font-size:14px;cursor:pointer;text-align:left;transition:background 0.15s,color 0.15s;}
      .et-tab:hover{background:rgba(251,246,236,0.08);}
      .et-tab-active{background:#FBF6EC;color:#6B2737;font-weight:600;}
      .et-tab-icon{display:flex;}
      .et-sidebar-actions{display:flex;flex-direction:column;gap:8px;}
      .et-add-btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:11px 14px;background:#C9A227;color:#3a2a05;border:none;border-radius:6px;font-weight:600;font-size:14px;cursor:pointer;transition:transform 0.12s;}
      .et-add-btn:hover{transform:translateY(-1px);}
      .et-transfer-btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:9px 14px;background:rgba(255,255,255,0.12);color:#FBF6EC;border:1px solid rgba(255,255,255,0.25);border-radius:6px;font-weight:500;font-size:13px;cursor:pointer;transition:background 0.15s;}
      .et-transfer-btn:hover{background:rgba(255,255,255,0.2);}

      .et-main{flex:1;padding:28px 34px 60px;max-width:1200px;overflow-y:auto;height:100vh;}
      .et-page-header{margin-bottom:20px;}
      .et-page-header-row{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:10px;}
      .et-page-title{font-size:28px;margin:0 0 2px;color:#3a2416;}
      .et-page-sub{margin:0;color:#7a7461;font-size:13.5px;}

      .et-card{background:#FBF6EC;border:1px solid #E3DBC6;border-radius:8px;box-shadow:0 1px 2px rgba(60,40,10,0.05);}
      .et-panel{padding:18px 20px;}
      .et-panel-title{font-size:14.5px;font-weight:600;margin:0 0 14px;color:#4a4432;display:flex;align-items:center;gap:6px;}
      .et-section-header{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #DDD1B8;padding-bottom:8px;margin-bottom:14px;}
      .et-section-title{font-size:15px;font-weight:600;color:#3a2416;margin:0;}

      /* Settings Sub navigation */
      .et-settings-nav{display:flex;gap:8px;border-bottom:2px solid #E3DBC6;padding-bottom:1px;overflow-x:auto;}
      .et-settings-nav-btn{background:none;border:none;padding:10px 16px;font-size:13.5px;color:#7a7461;cursor:pointer;border-bottom:2px solid transparent;transition:all 0.15s;font-weight:500;white-space:nowrap;}
      .et-settings-nav-btn:hover{color:#3a2416;}
      .et-settings-nav-btn-active{color:#6B2737;border-bottom-color:#6B2737;font-weight:600;}

      /* Dashboard */
      .et-dash-top{display:flex;gap:18px;align-items:stretch;flex-wrap:wrap;margin-bottom:22px;}
      .et-stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;}
      .et-stat-card{padding:14px 16px;}
      .et-stat-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
      .et-stat-label{font-size:12px;color:#847d68;}
      .et-stat-value{font-size:19px;font-weight:600;color:#2A2A20;}
      .et-stat-sub{font-size:11px;color:#8a8574;margin-top:2px;}
      .et-stat-icon{display:flex;}

      /* Account strip */
      .et-acc-strip{display:flex;gap:8px;flex-wrap:wrap;}
      .et-acc-chip{display:flex;align-items:center;gap:6px;padding:7px 10px;border-radius:20px;background:#FFFDF7;border:1px solid;cursor:pointer;font-size:12.5px;transition:transform 0.12s,box-shadow 0.12s;}
      .et-acc-chip:hover{transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,0.08);}
      .et-acc-chip-name{color:#4a4432;font-weight:500;}
      .et-acc-chip-bal{font-size:12px;font-weight:600;}

      /* Refund alert */
      .et-refund-alert{background:#FFF8EC;border:1px solid #E8C96A;border-radius:8px;padding:14px 16px;margin-bottom:20px;font-size:13px;color:#7a5a10;display:flex;flex-direction:column;gap:10px;}
      .et-refund-alert-head{display:flex;align-items:center;gap:6px;font-weight:600;}
      .et-refund-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
      .et-refund-note{flex:1;color:#8a7040;font-size:12px;}

      /* Stamp */
      .et-stamp{width:150px;height:150px;flex-shrink:0;border-radius:50%;border:3px double #A9792A;display:flex;align-items:center;justify-content:center;transform:rotate(-4deg);background:repeating-linear-gradient(#FBF6EC,#FBF6EC 6px,#F3EBD8 7px);animation:stampIn 0.5s ease;}
      .et-stamp-inner{text-align:center;transform:rotate(0.5deg);}
      .et-stamp-label{font-size:10.5px;text-transform:uppercase;letter-spacing:1px;color:#A9792A;font-weight:600;}
      .et-stamp-value{font-size:19px;font-weight:700;margin-top:2px;}
      .et-stamp-sub{font-size:9.5px;color:#8a8574;margin-top:2px;}
      @keyframes stampIn{from{transform:scale(0.75) rotate(-10deg);opacity:0;}to{transform:scale(1) rotate(-4deg);opacity:1;}}

      .et-dash-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:18px;margin-bottom:18px;}
      .et-legend-list{display:flex;flex-direction:column;gap:9px;flex:1;min-width:140px;}
      .et-legend-row{display:flex;align-items:center;gap:8px;font-size:13px;}
      .et-legend-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
      .et-legend-name{flex:1;color:#4a4432;}
      .et-legend-value{color:#2A2A20;font-weight:600;font-size:12.5px;}

      .et-ledger-list{display:flex;flex-direction:column;}
      .et-ledger-row{display:flex;align-items:center;gap:12px;padding:10px 2px;border-bottom:1px solid #EDE6D3;cursor:pointer;}
      .et-ledger-row:last-child{border-bottom:none;}
      .et-ledger-row:hover{background:#F5EFDF;}
      .et-ledger-icon{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
      .et-ledger-mid{flex:1;display:flex;flex-direction:column;min-width:0;}
      .et-ledger-cat{font-size:13.5px;color:#2A2A20;font-weight:500;}
      .et-ledger-note{font-size:12px;color:#8a8574;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
      .et-ledger-amt{font-size:13.5px;font-weight:600;color:#6B2737;flex-shrink:0;}

      .et-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:28px 10px;text-align:center;}
      .et-empty-text{font-size:13.5px;color:#5c563f;font-weight:500;}
      .et-empty-sub{font-size:12px;color:#8a8574;}

      .et-toast{position:fixed;top:18px;right:18px;z-index:200;background:#2F6B4F;color:#FBF6EC;padding:10px 16px;border-radius:6px;font-size:13px;display:flex;align-items:center;gap:8px;box-shadow:0 4px 14px rgba(0,0,0,0.15);}
      .et-fade-in{animation:fadeIn 0.22s ease;}
      @keyframes fadeIn{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:translateY(0);}}

      /* Filters */
      .et-filters{padding:16px 18px;display:flex;flex-direction:column;gap:12px;}
      .et-period-strip{margin-bottom:16px;}
      .et-filter-presets{display:flex;gap:8px;flex-wrap:wrap;}
      .et-chip{padding:6px 13px;border-radius:16px;border:1px solid #DDD1B8;background:#F5EFDF;color:#5c563f;font-size:12.5px;cursor:pointer;}
      .et-chip-active{background:#6B2737;border-color:#6B2737;color:#FBF6EC;}
      .et-filter-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;}
      .et-arrow-sep{color:#8a8574;}

      /* Inputs */
      .et-input{border:1px solid #DDD1B8;background:#FFFDF7;border-radius:6px;padding:8px 10px;font-size:13px;color:#2A2A20;font-family:'Inter',sans-serif;outline:none;}
      .et-input:focus{border-color:#A9792A;}
      .et-input-plain{border:none;background:transparent;padding:4px 0;flex:1;}
      .et-search-wrap{display:flex;align-items:center;gap:6px;border:1px solid #DDD1B8;background:#FFFDF7;border-radius:6px;padding:6px 10px;flex:1;min-width:180px;}
      .et-field-hint{font-size:11.5px;color:#8a8574;margin:0;line-height:1.4;}

      /* Buttons */
      .et-btn-outline{display:inline-flex;align-items:center;gap:6px;padding:9px 14px;border-radius:6px;border:1px solid #6B2737;background:transparent;color:#6B2737;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;}
      .et-btn-outline:hover{background:#6B2737;color:#FBF6EC;}
      .et-btn-primary{display:inline-flex;align-items:center;gap:6px;padding:9px 16px;border-radius:6px;border:none;background:#6B2737;color:#FBF6EC;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;}
      .et-btn-primary:hover{background:#4A1B27;}
      .et-btn-xs{display:inline-flex;align-items:center;gap:4px;padding:5px 9px;border-radius:5px;border:1px solid #DDD1B8;background:#F5EFDF;color:#4a4432;font-size:11.5px;font-weight:500;cursor:pointer;white-space:nowrap;transition:background 0.1s;}
      .et-btn-xs:hover{background:#DDD1B8;}
      .et-btn-xs-green{background:#E8F5EE;border-color:#2F6B4F;color:#2F6B4F;}
      .et-btn-xs-green:hover{background:#2F6B4F;color:#FBF6EC;}

      /* Balance blocks */
      .et-bal-block{display:flex;flex-direction:column;gap:4px;min-width:0;}
      .et-bal-label{font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#8a8574;font-weight:600;}
      .et-bal-value{font-size:16px;font-weight:600;}
      .et-bal-lg{font-size:22px;}
      .et-bal-summary-row{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:16px;}
      .et-bal-arrow{color:#8a8574;font-size:18px;}

      /* Accounts */
      .et-acc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;}
      .et-acc-card{padding:16px;}
      .et-acc-card-top{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
      .et-acc-card-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
      .et-acc-card-info{flex:1;}
      .et-acc-card-name{font-size:14px;font-weight:600;color:#2A2A20;}
      .et-acc-card-type{font-size:11.5px;color:#8a8574;margin-top:1px;}
      .et-acc-card-actions{display:flex;gap:2px;}
      .et-acc-card-bal{font-size:22px;font-weight:700;margin-bottom:6px;}
      .et-acc-card-stats{font-size:11.5px;color:#8a8574;display:flex;justify-content:space-between;margin-bottom:10px;}

      /* Per-account period summary cards */
      .et-acc-period-card{padding:16px;cursor:pointer;transition:transform 0.1s,box-shadow 0.1s;min-width:180px;flex:1;}
      .et-acc-period-card:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(0,0,0,0.08);}
      .et-acc-period-name{font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px;margin-bottom:12px;}
      .et-acc-period-row{display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid #EDE6D3;font-size:12px;}
      .et-acc-period-row:last-of-type{border-bottom:none;}
      .et-acc-period-closing{border-top:2px solid #DDD1B8!important;border-bottom:none!important;margin-top:4px;padding-top:8px!important;}
      .et-acc-period-lbl{color:#8a8574;}
      .et-acc-period-val{font-size:13px;font-weight:600;}
      .et-acc-period-zero{color:#8a8574;}
      .et-acc-card-detail{display:flex;align-items:center;justify-content:space-between;width:100%;background:#F5EFDF;border:none;border-radius:6px;padding:8px 12px;font-size:12.5px;color:#6B2737;font-weight:600;cursor:pointer;transition:background 0.12s;margin-top:12px;}
      .et-acc-card-detail:hover{background:#EDE6D3;}

      /* Account balance header */
      .et-acc-balance-big{text-align:right;}
      .et-acc-balance-label{font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#8a8574;font-weight:600;}
      .et-acc-balance-now{font-size:26px;font-weight:700;margin-top:2px;}

      /* Account timeline */
      .et-acc-timeline{display:flex;flex-direction:column;}
      .et-acc-tl-row{display:flex;align-items:center;gap:10px;padding:11px 4px;border-bottom:1px solid #EDE6D3;flex-wrap:wrap;}
      .et-acc-tl-row:last-child{border-bottom:none;}
      .et-acc-tl-icon{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
      .et-tl-debit{background:#FDE8E6;color:#A63A2E;}
      .et-tl-credit{background:#E6F4EB;color:#2F6B4F;}
      .et-acc-tl-mid{flex:1;min-width:0;display:flex;flex-direction:column;}
      .et-acc-tl-label{font-size:13.5px;font-weight:500;color:#2A2A20;}
      .et-acc-tl-sub{font-size:11.5px;color:#8a8574;}
      .et-acc-tl-amt{font-size:13.5px;font-weight:600;flex-shrink:0;}
      .et-amt-debit{color:#A63A2E;}
      .et-amt-credit{color:#2F6B4F;}

      /* Transfer badges */
      .et-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:12px;font-size:11px;font-weight:600;flex-shrink:0;}
      .et-badge-internal{background:#EAF1F9;color:#33608A;}
      .et-badge-family{background:#F0EAF9;color:#734279;}
      .et-badge-refund{background:#FFF4E0;color:#A9792A;}

      /* Transfer type buttons */
      .et-txf-type-row{display:flex;gap:8px;margin-bottom:8px;}
      .et-txf-type-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 8px;border-radius:8px;border:1px solid #DDD1B8;background:#F5EFDF;color:#5c563f;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.15s;}
      .et-txf-type-btn:hover{border-color:#A9792A;}
      .et-txf-type-active{background:#6B2737;border-color:#6B2737;color:#FBF6EC;}
      .et-txf-type-desc{font-size:12px;color:#8a8574;margin-bottom:4px;min-height:16px;}

      /* People */
      .et-people-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
      .et-people-card{padding:16px;display:flex;align-items:center;gap:14px;}
      .et-people-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-size:16px;font-weight:600;color:#FBF6EC;flex-shrink:0;}
      .et-people-info{flex:1;min-width:0;}
      .et-people-name{font-size:14px;font-weight:600;color:#2A2A20;}
      .et-people-rel{font-size:12px;color:#8a8574;}
      .et-people-phone{font-size:12px;color:#8a8574;}
      .et-people-actions{display:flex;gap:2px;flex-shrink:0;}

      /* Table */
      .et-table{display:flex;flex-direction:column;}
      .et-table-head,.et-table-row{display:grid;grid-template-columns:100px 140px 1fr 140px 110px 60px;gap:10px;align-items:center;padding:9px 4px;}
      .et-table-head{font-size:11px;text-transform:uppercase;letter-spacing:0.4px;color:#8a8574;border-bottom:1px solid #E3DBC6;}
      .et-table-row{border-bottom:1px solid #EDE6D3;font-size:13px;}
      .et-table-row:hover{background:#F5EFDF;}
      .et-table-date{color:#5c563f;font-size:12.5px;}
      .et-table-cat{display:flex;align-items:center;gap:6px;color:#2A2A20;}
      .et-cat-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
      .et-table-note{color:#8a8574;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;}
      .et-table-acc{font-size:12.5px;font-weight:500;}
      .et-table-method{color:#8a8574;font-size:12.5px;}
      .et-table-amt{color:#6B2737;font-weight:600;}
      .et-table-actions{display:flex;gap:3px;justify-content:flex-end;}
      .et-right{text-align:right;justify-self:end;}

      /* Icon buttons */
      .et-icon-btn{background:transparent;border:none;color:#8a8574;cursor:pointer;padding:5px;border-radius:5px;display:flex;}
      .et-icon-btn:hover{background:#EDE6D3;color:#3a3628;}
      .et-icon-danger{color:#A63A2E;}
      .et-icon-danger:hover{background:#A63A2E;color:#FBF6EC;}

      /* Progress */
      .et-progress-track{position:relative;height:7px;background:#EDE6D3;border-radius:4px;overflow:visible;}
      .et-progress-fill{height:100%;border-radius:4px;transition:width 0.3s ease;}
      .et-progress-budget-marker{position:absolute;top:-2px;width:2px;height:11px;background:#3a3628;}

      /* Category report */
      .et-cat-report-list{display:flex;flex-direction:column;gap:14px;}
      .et-cat-report-row{display:flex;gap:10px;align-items:flex-start;}
      .et-cat-report-mid{flex:1;}
      .et-cat-report-top{display:flex;justify-content:space-between;font-size:13px;color:#2A2A20;margin-bottom:5px;}
      .et-cat-report-sub{font-size:11px;color:#8a8574;margin-top:4px;}

      /* Category grid */
      .et-cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px;}
      .et-cat-card{padding:14px 16px;}
      .et-cat-card-top{display:flex;align-items:center;gap:8px;}
      .et-cat-card-name{flex:1;font-size:13.5px;font-weight:600;color:#2A2A20;}
      .et-cat-card-spent{font-size:16px;font-weight:600;color:#6B2737;margin-top:10px;}
      .et-cat-card-spent-label{font-size:11px;font-weight:400;color:#8a8574;}
      .et-budget-label{font-size:12px;color:#8a8574;flex:1;}

      /* Swatches & icon pickers */
      .et-swatch-row{display:flex;gap:5px;flex-wrap:wrap;}
      .et-swatch{width:20px;height:20px;border-radius:50%;border:2px solid transparent;cursor:pointer;}
      .et-swatch-active{border-color:#2A2A20;}
      .et-icon-row{display:flex;gap:4px;flex-wrap:wrap;}
      .et-icon-choice{width:28px;height:28px;border-radius:6px;border:1px solid #DDD1B8;background:#FFFDF7;display:flex;align-items:center;justify-content:center;cursor:pointer;}
      .et-icon-choice-active{background:#6B2737;border-color:#6B2737;}

      /* Modal */
      .et-modal-backdrop{position:fixed;inset:0;background:rgba(20,15,8,0.45);display:flex;align-items:center;justify-content:center;z-index:150;padding:20px;}
      .et-modal{background:#FBF6EC;border-radius:10px;padding:24px 26px;width:100%;max-width:480px;box-shadow:0 12px 40px rgba(0,0,0,0.25);max-height:92vh;overflow-y:auto;}
      .et-modal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
      .et-modal-title{font-size:20px;margin:0;color:#3a2416;}
      .et-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
      .et-field{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#7a7461;}
      .et-form-error{display:flex;align-items:center;gap:6px;color:#A63A2E;font-size:12.5px;margin-top:12px;}
      .et-modal-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:20px;}

      @media(max-width:860px){
        .et-shell{flex-direction:column;}
        .et-sidebar{width:100%;height:auto;position:relative;flex-direction:row;align-items:center;padding:14px 16px;gap:14px;flex-wrap:wrap;}
        .et-tabs{flex-direction:row;flex:1;overflow-x:auto;}
        .et-tab{border-radius:6px;flex-shrink:0;}
        .et-brand-sub{display:none;}
        .et-sidebar-actions{flex-direction:row;}
        .et-add-btn{flex-shrink:0;padding:10px 12px;}
        .et-main{padding:20px 16px 50px;}
        .et-table-head,.et-table-row{grid-template-columns:80px 1fr 80px 70px 50px;}
        .et-table-note,.et-table-acc{display:none;}
        .et-bal-summary-row{gap:10px;}
      }
    `}</style>
  );
}
