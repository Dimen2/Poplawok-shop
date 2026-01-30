export function formatPrice(price) {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0
  }).format(price);
}

export function calculateDiscount(oldPrice, newPrice) {
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getRatingStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? '★' : '☆');
  }
  return stars.join('');
}