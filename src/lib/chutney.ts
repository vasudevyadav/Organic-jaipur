export const CHUTNEY_PROCESS = {
  intro: "Local farmers se kharidi lal mirch ko dhoop mein sukhate hain. Aapka order aane par lal mirch, jeera, lahsun, dahi aur halka sa ghee silbatte par peeskar chutney banate hain. Phir pack karke aap tak pahunchate hain.",
  steps: [
    { title: "Local Farmers Se Lal Mirch", detail: "Hum lal mirch local farmers se kharidte hain.", note: "Chutney ki lal mirch local farmers se aati hai." },
    { title: "Dhoop Mein Sukhana", detail: "Kharidi hui lal mirch ko dhoop mein rakhkar sukhaya jata hai.", note: "Peesne se pehle mirch dhoop mein sukhai jati hai." },
    { title: "Order Par Silbatte Par Pisai", detail: "Aapka order aane ke baad dhoop mein sukhai lal mirch, jeera, lahsun, dahi aur halka sa ghee silbatte par hi peesa jata hai.", note: "Chutney order aane ke baad taiyar hoti hai." },
    { title: "Packing Aur Aap Tak Delivery", detail: "Silbatte par taiyar chutney ko pack kiya jata hai aur phir aap tak pahunchaya jata hai.", note: "Contains milk (dahi and ghee). Hamari batayi shelf life 15 din hai; pack par di gayi storage aur use-by instructions follow karein." },
  ],
};

export const CHUTNEY_DETAILS = {
  description: "Made to order with red chillies bought from local farmers and dried in the sun, then ground on a traditional silbatta with cumin (jeera), garlic, curd (dahi) and a little ghee. The prepared chutney is packed and delivered to you.",
  ingredients: "Red chilli, cumin (jeera), garlic, curd (dahi), a little ghee. Contains milk.",
  benefits: "Sun-dried red chillies from local farmers. Ground on a silbatta after your order, with cumin, garlic, curd and a little ghee, then packed and delivered.",
  storageInfo: "Our stated shelf life is 15 days. Follow the storage and use-by instructions on your pack. Contains milk (curd and ghee).",
};

export function isLaalMirchChutney(name: string): boolean {
  return /(?:laal|lal|red)\s+(?:mirch|chilli|chili).*chutney/i.test(name);
}
