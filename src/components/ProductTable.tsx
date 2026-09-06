type Product = {
    id: number;
    name: string;
    price: number;
    description: string | null;
}


type ProductTableProps = {
    products: Product[];
};

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function ProductTable({ products }: ProductTableProps) {
    return (
            <div className="mt-6 overflow-x-auto">
                <Table>
                     <TableCaption>A list of products.</TableCaption>
                    <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="border border-gray-300 p-3 text-left  text-gray-500">
                        ID
                        </TableHead>

                        <TableHead className="border border-gray-300 p-3 text-left  text-gray-500">
                        Product Name
                        </TableHead >

                        <TableHead className="border border-gray-300 p-3 text-left  text-gray-500">
                        Description
                        </TableHead>

                        <TableHead className="border border-gray-300 p-3 text-left text-gray-500">
                        Price
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow>
                            <TableCell className="font-medium">
                                No products found.
                            </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="border border-gray-300 p-3">
                                {product.id}
                                </TableCell>

                                <TableCell className="border border-gray-300 p-3">
                                {product.name}
                                </TableCell>

                                <TableCell className="border border-gray-300 p-3">
                                {product.description}
                                </TableCell>

                                <TableCell className="border border-gray-300 p-3">
                                ₱{product.price.toFixed(2)}
                                </TableCell>
                            </TableRow>
                            ))
                        )}
                        </TableBody>
                    </Table>
                    </div>
    );
         }