export type RajasthanCity = {
  slug: string;
  name: string;
  blurb: string;
};

export const RAJASTHAN_CITIES: RajasthanCity[] = [
  {
    slug: "jodhpur",
    name: "Jodhpur",
    blurb: "the Blue City of Rajasthan, in the state's Marwar region.",
  },
  {
    slug: "udaipur",
    name: "Udaipur",
    blurb: "the City of Lakes, in southern Rajasthan.",
  },
  {
    slug: "kota",
    name: "Kota",
    blurb: "a major city on the banks of the Chambal river in Hadoti, Rajasthan.",
  },
  {
    slug: "ajmer",
    name: "Ajmer",
    blurb: "a historic city in central Rajasthan, near Pushkar.",
  },
  {
    slug: "bikaner",
    name: "Bikaner",
    blurb: "a desert city in northern Rajasthan, known for its forts and havelis.",
  },
  {
    slug: "alwar",
    name: "Alwar",
    blurb: "a city in north-eastern Rajasthan, close to the Delhi-NCR region.",
  },
  {
    slug: "bhilwara",
    name: "Bhilwara",
    blurb: "a textile city in the Mewar region of Rajasthan.",
  },
  {
    slug: "sikar",
    name: "Sikar",
    blurb: "a city in the Shekhawati region of northern Rajasthan.",
  },
] as const;
