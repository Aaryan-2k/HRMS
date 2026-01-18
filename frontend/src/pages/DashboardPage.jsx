import { useState } from 'react';
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar"
import Stats from "../components/Stats"
import QuickActions from "../components/QuickAction"
import EmpAddForm from "../components/EmpAddForm"

export default function DashboardPage(){
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white antialiased min-h-screen flex">
        <SideBar></SideBar>
        <main className="flex-1 flex flex-col min-w-0">
            <NavBar></NavBar>
            <div className="p-8 max-w-[1200px] w-full mx-auto">
                <Stats></Stats>
                <div className="flex flex-col lg:flex-row gap-8">
                    <QuickActions onOpenForm={() => setIsFormOpen(true)}></QuickActions>
                </div>
            </div>
        </main>
        <EmpAddForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
    )
}