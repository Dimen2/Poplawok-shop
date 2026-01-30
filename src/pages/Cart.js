import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-12">
              <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Кошик порожній</h2>
              <p className="text-gray-600 mb-6">Додайте товари до кошика, щоб зробити замовлення</p>
              <Link to="/catalog">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Перейти до каталогу
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Кошик</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-semibold hover:text-blue-600 transition-colors mb-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-3">
                        {item.price} грн за штуку
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {item.price * item.quantity} грн
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Замовлення</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Товарів:</span>
                    <span className="font-semibold">{cart.length}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Сума:</span>
                    <span className="font-semibold">{cartTotal} грн</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Доставка:</span>
                    <span className="font-semibold text-green-600">Безкоштовно</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">До сплати:</span>
                      <span className="text-2xl font-bold text-blue-600">{cartTotal} грн</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                >
                  Оформити замовлення
                </Button>

                <Link to="/catalog">
                  <Button variant="outline" className="w-full mt-3">
                    Продовжити покупки
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
