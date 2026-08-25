import {createClient} from '@/lib/supabase/server';
import {prisma} from '@/lib/prisma';
import {AppSidebar} from '@/components/AppSidebar';
import {SidebarProvider} from '@/components/ui/sidebar';
import {redirect} from 'next/navigation';
import ProductForm from '@/components/ProductForm';


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
  return (
    <SidebarProvider> 
      <div className="flex min-h-screen w-full">
        <AppSidebar isAdmin={false} firstName={appUser?.firstName} lastName={appUser?.lastName} />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <ProductForm />
        </main>
      </div>  
      </SidebarProvider>
  );
}
