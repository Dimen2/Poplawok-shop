import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Textarea } from '../components/ui/textarea';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from '../hooks/use-toast';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: '',
    address: '',
    paymentMethod: 'card',
    deliveryMethod: 'novaposhta',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast({
      title: 'Замовлення оформлено!',
      description: 'Дякуємо за ваше замовлення. Ми зв’яжемось з вами найближчим часом.'
    });

    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    // Используем useEffect для навигации, чтобы избежать ошибок рендеринга
    setTimeout(() => navigate('/cart'), 0);
    return null;
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Оформлення замовлення</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Контактні дані */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Контактні дані
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Прізвище та ім'я</Label>
                      <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Іваненко Іван"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Телефон *</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+380501234567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="email@example.com"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Доставка */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Доставка
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Спосіб доставки</Label>
                      <RadioGroup
                          value={formData.deliveryMethod}
                          onValueChange={(value) => setFormData({ ...formData, deliveryMethod: value })}
                          className="mt-2"
                      >
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="novaposhta" id="novaposhta" />
                          <Label htmlFor="novaposhta" className="cursor-pointer flex-1">
                            <div className="font-semibold">Нова Пошта</div>
                            <div className="text-sm text-gray-600">Доставка у відділення</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="courier" id="courier" />
                          <Label htmlFor="courier" className="cursor-pointer flex-1">
                            <div className="font-semibold">Кур'єр</div>
                            <div className="text-sm text-gray-600">Доставка за адресою</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="pickup" id="pickup" />
                          <Label htmlFor="pickup" className="cursor-pointer flex-1">
                            <div className="font-semibold">Самовивіз</div>
                            <div className="text-sm text-gray-600">З магазину</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label htmlFor="city">Місто *</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleChange} required placeholder="Київ" />
                    </div>
                    <div>
                      <Label htmlFor="address">Адреса / Відділення *</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleChange} required placeholder="Відділення №21" />
                    </div>
                  </CardContent>
                </Card>

                {/* Оплата */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Оплата
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="cursor-pointer flex-1">Оплата картою онлайн</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="cursor-pointer flex-1">Готівкою при отриманні</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Коментар */}
                <Card>
                  <CardHeader><CardTitle>Коментар до замовлення</CardTitle></CardHeader>
                  <CardContent>
                    <Textarea name="comment" value={formData.comment} onChange={handleChange} placeholder="Додаткові побажання..." rows={4} />
                  </CardContent>
                </Card>
              </div>

              {/* Підсумок */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader><CardTitle>Ваше замовлення</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cart.map(item => (
                          <div key={item.id} className="flex gap-3 text-sm">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{item.name}</p>
                              <p className="text-gray-600">{item.quantity} шт × {item.price} грн</p>
                            </div>
                            <div className="font-semibold">{item.price * item.quantity} грн</div>
                          </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between"><span>Сума:</span><span className="font-semibold">{cartTotal} грн</span></div>
                      <div className="flex justify-between"><span>Доставка:</span><span className="font-semibold text-green-600">Безкоштовно</span></div>
                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="text-lg font-bold">До сплати:</span>
                        <span className="text-2xl font-bold text-blue-600">{cartTotal} грн</span>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">Підтвердити замовлення</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Checkout;