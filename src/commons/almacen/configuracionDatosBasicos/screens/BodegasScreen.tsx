import { TablaGeneral } from './../../../../components/TablaGeneral'
interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  status: string;
  rating: number;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export function BodegasScreen(): JSX.Element {
 
  const rows: Product[] = [
    {
      id: '1006',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      status: 'INSTOCK',
      rating: 5
  },
  {
      id: '1005',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      status: 'INSTOCK',
      rating: 5
  },
  {
      id: '1004',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      status: 'INSTOCK',
      rating: 5
  },
  {
      id: '1003',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      status: 'INSTOCK',
      rating: 5
  },
  {
      id: '1001',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      status: 'INSTOCK',
      rating: 5
  },
  {
      id: '1002',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      status: 'INSTOCK',
      rating: 5
  },
    // Agrega aquí más objetos para mostrar más productos en la tabla
  ];

  const columns = [
    { field: "code", header: "Code",visible: true },
    { field: "name", header: "Name",visible: true },
    { field: "category", header: "Category",visible: true },
    { field: "quantity", header: "Quantity",visible: true },
  ];



  return (
    <div className="App">
      <TablaGeneral 
      showButtonExport
      tittle={'Productos'} 
      columns={columns} 
      rowsData={rows}
      staticscroll={true}
      stylescroll={"780px"}
       />
    </div>
  );
  }
  