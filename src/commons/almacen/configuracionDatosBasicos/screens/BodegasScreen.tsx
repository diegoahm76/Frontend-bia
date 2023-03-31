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
    {
      id: '1003',
      code: 'g564fg4h6',
      name: 'Leather Wallet',
      description: 'Product Description',
      image: 'leather-wallet.jpg',
      price: 50,
      category: 'Accessories',
      quantity: 10,
      status: 'LOWSTOCK',
      rating: 4
    },
    {
      id: '1004',
      code: 'h456sd5f6',
      name: 'Denim Jacket',
      description: 'Product Description',
      image: 'denim-jacket.jpg',
      price: 95,
      category: 'Clothing',
      quantity: 8,
      status: 'OUTOFSTOCK',
      rating: 3
    },
    {
      id: '1005',
      code: 'j567f5g7h',
      name: 'Leather Shoes',
      description: 'Product Description',
      image: 'leather-shoes.jpg',
      price: 110,
      category: 'Shoes',
      quantity: 14,
      status: 'INSTOCK',
      rating: 4
    },
    {
      id: '1006',
      code: 'k456k4j3h',
      name: 'Leather Bag',
      description: 'Product Description',
      image: 'leather-bag.jpg',
      price: 80,
      category: 'Accessories',
      quantity: 20,
      status: 'INSTOCK',
      rating: 5
    },
    {
      id: '1007',
      code: 'n456fg4h6',
      name: 'T-Shirt',
      description: 'Product Description',
      image: 't-shirt.jpg',
      price: 30,
      category: 'Clothing',
      quantity: 40,
      status: 'INSTOCK',
      rating: 3
    },
    {
      id: '1008',
      code: 'p234fj0g3',
      name: 'Sneakers',
      description: 'Product Description',
      image: 'sneakers.jpg',
      price: 95,
      category: 'Shoes',
      quantity: 18,
      status: 'INSTOCK',
      rating: 4
    },
    {
      id: '1009',
      code: 'q567kj5f6',
      name: 'Backpack',
      description: 'Product Description',
      image: 'backpack.jpg',
      price: 75,
      category: 'Accessories',
      quantity: 30,
      status: 'INSTOCK',
      rating: 5
    },
    {
      id: '1010',
      code: 'r765gf7h8',
      name: 'Jeans',
      description: 'Product Description',
      image: 'jeans.jpg',
      price: 60,
      category: 'Clothing',
      quantity: 12,
      status: 'LOWSTOCK',
      rating: 4
    },
    {
      id: '1011',
      code: 't678hj9k0',
      name: 'Leather Belt',
      description: 'Product Description',
      image: 'leather-belt.jpg',
      price: 40,
      category: 'Accessories',
      quantity: 15,
      status: 'INSTOCK',
      rating: 3
    },
    {
      id: '1012',
      code: 'u890lm2n4',
      name: 'Hoodie',
      description: 'Product Description',
      image: 'hoodie.jpg',
      price: 55,
      category: 'Clothing',
      quantity: 20,
      status: 'INSTOCK',
      rating: 4
    },
    {
      id: '1013',
      code: 'w789gh3j5',
      name: 'Running Shoes',
      description: 'Product Description',
      image: 'running-shoes.jpg',
      price: 120,
      category: 'Shoes',
      quantity: 5,
      status: 'LOWSTOCK',
      rating: 5
    },
    {
      id: '1014',
      code: 'x456fh4h6',
      name: 'Sunglasses',
      description: 'Product Description',
      image: 'sunglasses.jpg',
      price: 45,
      category: 'Accessories',
      quantity: 30,
      status: 'INSTOCK',
      rating: 3
    },
    {
      id: '1015',
      code: 'y234fj0g3',
      name: 'Leather Gloves',
      description: 'Product Description',
      image: 'leather-gloves.jpg',
      price: 35,
      category: 'Accessories',
      quantity: 25,
      status: 'INSTOCK',
      rating: 4
    },
    {
      id: '1016',
      code: 'z567gh5j6',
      name: 'Shorts',
      description: 'Product Description',
      image: 'shorts.jpg',
      price: 40,
      category: 'Clothing',
      quantity: 18,
      status: 'INSTOCK',
      rating: 3
    },
    {
      id: '1017',
      code: 'a890lm2n4',
      name: 'High Heels',
      description: 'Product Description',
      image: 'high-heels.jpg',
      price: 90,
      category: 'Shoes',
      quantity: 8,
      status: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: '1018',
      code: 'b456fh4h6',
      name: 'Smart Watch',
      description: 'Product Description',
      image: 'smart-watch.jpg',
      price: 140,
      category: 'Accessories',
      quantity: 12,
      status: 'INSTOCK',
      rating: 5
    },
    {
      id: '1019',
      code: 'c234fj0g3',
      name: 'Leather Backpack',
      description: 'Product Description',
      image: 'leather-backpack.jpg',
      price: 85,
      category: 'Accessories',
      quantity: 15,
      status: 'LOWSTOCK',
      rating: 4
    },
    {
      id: '1020',
      code: 'd567gh5j6',
      name: 'Swimwear',
      description: 'Product Description',
      image: 'swimwear.jpg',
      price: 50,
      category: 'Clothing',
      quantity: 22,
      status: 'INSTOCK',
      rating: 3
    },
    {
      id: '1021',
      code: 'e890lm2n4',
      name: 'Hiking Boots',
      description: 'Product Description',
      image: 'hiking-boots.jpg',
      price: 120,
      category: 'Shoes',
      quantity: 5,
      status: 'LOWSTOCK',
      rating: 5
    },
    {
      id: '1022',
      code: 'f456fh4h6',
      name: 'Wireless Earbuds',
      description: 'Product Description',
      image: 'wireless-earbuds.jpg',
      price: 60,
      category: 'Accessories',
      quantity: 30,
      status: 'INSTOCK',
      rating: 4
    },
    {
      id: '1023',
      code: 'g234fj0g3',
      name: 'Leather Jacket',
      description: 'Product Description',
      image: 'leather-jacket.jpg',
      price: 150,
      category: 'Clothing',
      quantity: 6,
      status: 'OUTOFSTOCK',
      rating: 5
    },
    {
      id: '1024',
      code: 'h567gh5j6',
      name: 'Dress Shoes',
      description: 'Product Description',
      image: 'dress-shoes.jpg',
      price: 110,
      category: 'Shoes',
      quantity: 12,
      status: 'INSTOCK',
      rating: 4
    },
    {
      id: '1025',
      code: 'j890lm2n4',
      name: 'Smartphone Case',
      description: 'Product Description',
      image: 'smartphone-case.jpg',
      price: 25,
      category: 'Accessories',
      quantity: 25,
      status: 'INSTOCK',
      rating: 3
    },
    {
      id: '1026',
      code: 'k456fh4h6',
      name: 'Winter Coat',
      description: 'Product Description',
      image: 'winter-coat.jpg',
      price: 200,
      category: 'Clothing',
      quantity: 4,
      status: 'LOWSTOCK',
      rating: 5
    },
    {
      id: '1027',
      code: 'n234fj0g3',
      name: 'Leather Boots',
      description: 'Product Description',
      image: 'leather-boots.jpg',
      price: 130,
      category: 'Shoes',
      quantity: 9,
      status: 'INSTOCK',
      rating: 4
    },
    {
      id: '1028',
      code: 'p567gh5j6',
      name: 'Knit Hat',
      description: 'Product Description',
      image: 'knit-hat.jpg',
      price: 20,
      category: 'Accessories',
      quantity: 28,
      status: 'INSTOCK',
      rating: 3
    },
    {
      id: '1029',
      code: 'q890lm2n4',
      name: 'Blouse',
      description: 'Product Description',
      image: 'blouse.jpg',
      price: 40,
      category: 'Clothing',
      quantity: 16,
      status: 'INSTOCK',
      rating: 4
    },
    {
      id: '1030',
      code: 'r456fh4h6',
      name: 'Leather Watch',
      description: 'Product Description',
      image: 'leather-watch.jpg',
      price: 80,
      category: 'Accessories',
      quantity: 20,
      status: 'INSTOCK',
      rating: 5
    },
    {
      id: '1031',
      code: 't234fj0g3',
      name: 'Sneakers',
      description: 'Product Description',
      image: 'sneakers2.jpg',
      price: 100,
      category: 'Shoes',
      quantity: 14,
      status: 'INSTOCK',
      rating: 4
    },
    {
      id: '1032',
      code: 'u567gh5j6',
      name: 'Pajamas',
      description: 'Product Description',
      image: 'pajamas.jpg',
      price: 45,
      category: 'Clothing',
      quantity: 30,
      status: 'INSTOCK',
      rating: 3
    },
    {
      id: '1033',
      code: 'w890lm2n4',
      name: 'Fitness Tracker',
      description: 'Product Description',
      image: 'fitness-tracker.jpg',
      price: 75,
      category: 'Accessories',
      quantity: 18,
      status: 'INSTOCK',
      rating: 4
    },
    {
      id: '1034',
      code: 'x456fh4h6',
      name: 'Ankle Boots',
      description: 'Product Description',
      image: 'ankle-boots.jpg',
      price: 90,
      category: 'Shoes',
      quantity: 10,
      status: 'LOWSTOCK',
      rating: 5
    },
    {
      id: '1035',
      code: 'y234fj0g3',
      name: 'Sweater',
      description: 'Product Description',
      image: 'sweater.jpg',
      price: 60,
      category: 'Clothing',
      quantity: 22,
      status: 'INSTOCK',
      rating: 3
    },
    {
      id: '1036',
      code: 'z567gh5j6',
      name: 'Necklace',
      description: 'Product Description',
      image: 'necklace.jpg',
      price: 35,
      category: 'Accessories',
      quantity: 28,
      status: 'INSTOCK',
      rating: 4
    },
    {
      id: '1037',
      code: 'a890lm2n4',
      name: 'Boots',
      description: 'Product Description',
      image: 'boots.jpg',
      price: 120,
      category: 'Shoes',
      quantity: 6,
      status: 'OUTOFSTOCK',
      rating: 5
    },
    // Agrega aquí más objetos para mostrar más productos en la tabla
  ];

  const columns = [
    { field: "code", header: "Code", visible: true },
    { field: "name", header: "Name", visible: true },
    { field: "category", header: "Category", visible: true },
    { field: "quantity", header: "Quantity", visible: true },
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
