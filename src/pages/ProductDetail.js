import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Minus, Plus, Star, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useCart } from '../context/CartContext';
import { products } from './mockData';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  if (!product) {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Товар не знайдено</h1>
          <Link to="/catalog"><Button>Повернутись до каталогу</Button></Link>
        </div>
    );
  }

  const favorite = isFavorite(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
      <div className="product-page-main">
        {/* Breadcrumbs */}
        <div className="breadcrumbs-bar">
          <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">Головна</Link>
            <ChevronRight size={14} />
            <Link to="/catalog" className="hover:text-blue-600">Каталог</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-10 mb-12">

            {/* Фото товара */}
            <div className="relative product-image-wrapper">
              <Card className="border-none shadow-sm">
                <CardContent className="p-0">
                  <img src={product.image} alt={product.name} className="w-full h-auto rounded-xl object-cover" />
                </CardContent>
              </Card>
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge className="bg-emerald-500 border-none px-3 py-1">Новинка</Badge>}
                {product.isHit && <Badge className="bg-orange-500 border-none px-3 py-1">Хіт</Badge>}
                {product.discount && <Badge className="bg-red-500 border-none px-3 py-1">-{product.discount}%</Badge>}
              </div>
            </div>

            {/* Инфо */}
            <div className="product-info-content">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < Math.floor(product.rating || 4) ? 'fill-current' : ''} />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">({product.reviews || 0} відгуків)</span>
              </div>

              <div className="mb-4">
                <span className="text-4xl font-extrabold text-blue-600">{product.price} грн</span>
              </div>

              <div className="mb-6">
                <Badge className={product.inStock ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none" : "bg-red-100 text-red-700 border-none"}>
                  {product.inStock ? "В наявності" : "Немає в наявності"}
                </Badge>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed text-sm">{product.description}</p>

              {/* Actions Row - Кнопки в ряд */}
              <div className="flex items-center gap-3 mb-6 action-buttons-row">
                <div className="flex items-center border rounded-lg bg-gray-50 h-12">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 hover:text-blue-600 transition-colors"><Minus size={16}/></button>
                  <span className="px-4 font-bold text-lg min-w-[40px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 hover:text-blue-600 transition-colors"><Plus size={16}/></button>
                </div>

                <Button onClick={() => addToCart(product, quantity)} className="flex-1 bg-blue-600 hover:bg-blue-700 h-12 text-base font-bold gap-2">
                  <ShoppingCart size={20} /> Додати в кошик
                </Button>

                <Button onClick={() => toggleFavorite(product)} variant="outline" className={`h-12 w-12 p-0 border-gray-200 ${favorite ? 'text-blue-600 border-blue-600' : ''}`}>
                  <Heart size={22} className={favorite ? 'fill-current' : ''} />
                </Button>
              </div>

              {/* Total Плашка */}
              <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl flex justify-between items-center">
                <span className="text-blue-900 font-medium">Загальна вартість:</span>
                <span className="text-2xl font-black text-blue-600">{product.price * quantity} грн</span>
              </div>
            </div>
          </div>

          {/* Характеристики */}
          <Card className="border-none shadow-sm mb-12">
            <CardContent className="p-6">
              <Tabs defaultValue="specs">
                <TabsList className="flex gap-8 bg-transparent border-b rounded-none h-auto p-0 mb-6">
                  <TabsTrigger value="specs" className="tab-trigger-custom">Характеристики</TabsTrigger>
                  <TabsTrigger value="description" className="tab-trigger-custom">Опис</TabsTrigger>
                  <TabsTrigger value="reviews" className="tab-trigger-custom">Відгуки</TabsTrigger>
                </TabsList>
                <TabsContent value="specs">
                  <div className="divide-y divide-gray-100">
                    {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-4">
                          <span className="text-gray-500 font-medium">{key}:</span>
                          <span className="text-gray-900 font-bold">{value}</span>
                        </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="description" className="py-4 text-gray-700 leading-7">
                  {product.description}
                </TabsContent>
                <TabsContent value="reviews" className="py-10 text-center text-gray-500">
                  Відгуків поки немає. Будьте першим!
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Схожі товари */}
          {relatedProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Схожі товари</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default ProductDetail;