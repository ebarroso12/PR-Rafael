const DEFAULT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5516991053955";

export function whatsappUrl(message: string, number: string = DEFAULT_NUMBER) {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function formatWhatsappDisplay(number: string = DEFAULT_NUMBER) {
    // 55 16 99105-3955
  const match = number.match(/^55(\d{2})(\d{5})(\d{4})$/);
    if (!match) return number;
    return `+55 ${match[1]} ${match[2]}-${match[3]}`;
}
