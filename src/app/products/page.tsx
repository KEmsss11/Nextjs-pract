import {createClient} from '@/lib/supabase/server';
import {prisma} from '@/lib/prisma';
import {AppSidebar} from '@/components/AppSidebar';
import {SidebarProvider} from '@/components/ui/sidebar';
import {redirect} from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import ProductTable from "@/components/ProductTable";
import { SidebarTrigger } from "@/components/ui/sidebar";



export default async function ProductsPage() {
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }
  const appUser = await prisma.user.findUnique({
    where: {id: user.id},
    select: {
      firstName: true,
      lastName: true,
    },
  });

  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });
  const formattedProducts = products.map((product) => ({
  ...product,
  price: Number(product.price),
}));
  return (
    <SidebarProvider> 
        <SidebarTrigger />
      <div className="flex min-h-screen w-full">
        <AppSidebar isAdmin={false} firstName={appUser?.firstName} lastName={appUser?.lastName} />
        <main className="flex-1 p-6">
             <SidebarTrigger />
          <h1 className="text-3xl font-bold">Products</h1>
          <ProductForm />
          <ProductTable products={formattedProducts} />
        </main>
      </div>  
      </SidebarProvider>
  );
}
