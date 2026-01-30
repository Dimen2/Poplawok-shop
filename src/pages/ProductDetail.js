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

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Товар не знайдено</h1>
        <Link to="/catalog">
          <Button>Повернутись до каталогу</Button>
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Головна</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/catalog" className="hover:text-blue-600">Каталог</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Product Main Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="relative">
            <Card>
              <CardContent className="p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
              </CardContent>
            </Card>
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <Badge className="bg-green-500">Новинка</Badge>}
              {product.isHit && <Badge className="bg-orange-500">Хіт</Badge>}
              {product.discount && <Badge className="bg-red-500">-{product.discount}%</Badge>}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-yellow-400 text-xl">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} відгуків)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-blue-600">{product.price} грн</span>
              {product.oldPrice && (
                <span className="text-2xl text-gray-500 line-through">{product.oldPrice} грн</span>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6">
              {product.inStock ? (
                <Badge className="bg-green-500">В наявності</Badge>
              ) : (
                <Badge variant="destructive">Немає в наявності</Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  disabled={!product.inStock}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  disabled={!product.inStock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 h-12"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Додати в кошик
              </Button>

              <Button
                onClick={() => toggleFavorite(product)}
                variant="outline"
                className="h-12"
              >
                <Heart className={`h-5 w-5 ${favorite ? 'fill-current text-red-500' : ''}`} />
              </Button>
            </div>

            {/* Total */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Загальна вартість:</span>
                <span className="text-2xl font-bold text-blue-600">{product.price * quantity} грн</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <Tabs defaultValue="specs">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specs">Характеристики</TabsTrigger>
                <TabsTrigger value="description">Опис</TabsTrigger>
                <TabsTrigger value="reviews">Відгуки</TabsTrigger>
              </TabsList>
              <TabsContent value="specs" className="mt-6">
                {product.specifications && (
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex border-b pb-2">
                        <span className="font-semibold w-1/3 text-gray-700">
                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                        </span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="description" className="mt-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="text-center py-8 text-gray-600">
                  <p>Відгуків поки немає. Будьте першим!</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Схожі товари</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
