const products = [
  {
    _id: "67def6e42b2c146578729f60",
    categoryId: "67dee9c012d36efdd1027b43",
    colorId: "67deec8e2b2c146578729f2f",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f93fec70-da18-44f9-a18d-27a5edd24037/M+NK+DF+FORM+7IN+UL+SHORT.png",
    name: "Nike Dri-FIT Training Shorts",
    price: 40,
    stripePriceId: "price_1R5W5XJjbWEvglIU42i6PuXC",
    description:
      "Lightweight and breathable training shorts designed for high-performance workouts.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67def6f32b2c146578729f64",
    categoryId: "67dee9c012d36efdd1027b43",
    colorId: "67deecb02b2c146578729f31",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4d2bc9f3-6a55-4cd0-81f1-f1bd9bdb9723/M+NK+CLUB+FLOW+SHORT.png",
    name: "Nike Sportswear Woven Shorts",
    price: 50,
    stripePriceId: "price_1R5W5mJjbWEvglIUb5WgcWAl",
    description:
      "Casual woven shorts with a comfortable fit and modern aesthetic.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67def70b2b2c146578729f68",
    categoryId: "67dee9c012d36efdd1027b43",
    colorId: "67deec642b2c146578729f2b",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0588a1a7-f96c-4983-b10e-50e0dc505e45/M+NK+DF+WVN+ICON+6IN+SHORT+STF.png",
    name: "Nike Basketball Dri-FIT Shorts",
    price: 45,
    stripePriceId: "price_1R5W6AJjbWEvglIU8A9pGc3d",
    description:
      "Basketball shorts with moisture-wicking fabric and a relaxed fit for game-time comfort.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67defdfed2a89836105f675c",
    categoryId: "67dee9cd12d36efdd1027b45",
    colorId: "67deecb02b2c146578729f31",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/674515e1-3d58-4635-a701-7d7e6c37b4c0/M+NK+DF+PRIMARY+STMT+SS.png",
    name: "Nike Dri-FIT Training T-Shirt",
    price: 35,
    stripePriceId: "price_1R5WYrJjbWEvglIUpETkqOLk",
    description:
      "A sweat-wicking training t-shirt designed for comfort and mobility during workouts.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67defe10d2a89836105f6760",
    categoryId: "67dee9cd12d36efdd1027b45",
    colorId: "67deec8e2b2c146578729f2f",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/553a3029-81d3-48c5-a176-6a98c9392e41/M+NSW+TEE+M90+OC+HBR+PK4.png",
    name: "Nike Air Max Graphic T-Shirt",
    price: 30,
    stripePriceId: "price_1R5WZ9JjbWEvglIUMd2m0UHc",
    description:
      "A casual t-shirt featuring bold Air Max graphic designs for a sporty look.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67defe1fd2a89836105f6764",
    categoryId: "67dee9cd12d36efdd1027b45",
    colorId: "67deecd52b2c146578729f33",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0e41a9d9-029d-4ec5-af19-182ee2b5721e/M+NSW+TEE+ICON+SWOOSH.png",
    name: "Nike Sportswear Swoosh T-Shirt",
    price: 28,
    stripePriceId: "price_1R5WZOJjbWEvglIUqdkyCI8m",
    description:
      "A classic Nike t-shirt with a large Swoosh logo for everyday wear.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67defe31d2a89836105f6768",
    categoryId: "67deea2812d36efdd1027b47",
    colorId: "67deec8e2b2c146578729f2f",
    image:
      "https://static.nike.com/a/images/t_prod/w_1920,c_limit,f_auto,q_auto/ebaf91e3-8e79-4dac-8947-169111f38fff/image.jpg",
    name: "Nike Sportswear Club Joggers",
    price: 60,
    stripePriceId: "price_1R5WZhJjbWEvglIU9iMkrCvE",
    description:
      "Soft joggers with a relaxed fit, perfect for casual or active days.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67defe44d2a89836105f676c",
    categoryId: "67deea2812d36efdd1027b47",
    colorId: "67deec7f2b2c146578729f2d",
    image:
      "https://static.nike.com/a/images/t_prod/w_1920,c_limit,f_auto,q_auto/c25018a6-af5e-4f02-afff-aef9c5f1ae2c/pdp.jpg",
    name: "Nike ACG Trail Pants",
    price: 120,
    stripePriceId: "price_1R5WZzJjbWEvglIUg0EBCYLy",
    description:
      "Durable pants designed for hiking and outdoor activities with adjustable cuffs for a custom fit.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67defe57d2a89836105f6770",
    categoryId: "67deea2812d36efdd1027b47",
    colorId: "67deec8e2b2c146578729f2f",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8e169e49-e6dc-4f84-9468-4d8b0864b997/M+NK+DF+PHENOM+ELITE+KNIT+PANT.png",
    name: "Nike Training Essentials Pants",
    price: 70,
    stripePriceId: "price_1R5WaIJjbWEvglIUJtkpTQNH",
    description:
      "Everyday training pants with moisture-wicking fabric and a comfortable fit.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67defe6ad2a89836105f6774",
    categoryId: "67deea3012d36efdd1027b49",
    colorId: "67deecd52b2c146578729f33",
    image:
      "https://i8.amplience.net/i/jpl/sz_506453_a?qlt=92&w=600&h=464&v=1&fmt=auto",
    name: "Nike Everyday Plus Cushioned Socks",
    price: 18,
    stripePriceId: "price_1R5WabJjbWEvglIUEEMDw6M6",
    description:
      "Comfortable cushioned socks designed for everyday wear and athletic performance.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67defe79d2a89836105f6778",
    categoryId: "67deea3012d36efdd1027b49",
    colorId: "67deec642b2c146578729f2b",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/78e7ff88-6ef9-49e1-bdaf-336d4f40e08a/U+NK+UNICORN+CSH+AKL+1PR+-+160.png",
    name: "Nike Dri-FIT Running Socks",
    price: 20,
    stripePriceId: "price_1R5WaqJjbWEvglIUsLDTPzUm",
    description:
      "Breathable socks designed to keep feet dry during intense running sessions.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67defe8bd2a89836105f677c",
    categoryId: "67deea3012d36efdd1027b49",
    colorId: "67deec8e2b2c146578729f2f",
    image:
      "https://cdn.media.amplience.net/i/pgatss/2000000002501-57-01_pc?$large$&fmt=auto",
    name: "Nike Performance Crew Socks",
    price: 18,
    stripePriceId: "price_1R5Wb8JjbWEvglIUvBRSgQQn",
    description:
      "High-performance crew socks made from moisture-wicking fabric for enhanced comfort.",
    featured: true,
    __v: 0,
  },
  {
    _id: "67df89a1ec2e6e61d4c61477",
    categoryId: "67dee99f12d36efdd1027b40",
    image: "/assets/images/2507976b1988e6d9a08599fcba5247bd.png",
    name: "Casual Shoe",
    price: 225,
    stripePriceId: "price_1R5frQJjbWEvglIUYkqeE47v",
    description: "Lorem ipsum",
    featured: true,
    __v: 0,
  },
  {
    _id: "67df89d5ec2e6e61d4c6147c",
    categoryId: "67dee99f12d36efdd1027b40",
    image: "/assets/images/5c482fd10ff96fad137ae5ca5aa7a561.png",
    name: "Skateboard Shoe",
    price: 125,
    stripePriceId: "price_1R5fsGJjbWEvglIU8z1ovxyc",
    description: "Lorem ipsum",
    featured: true,
    __v: 0,
  },
  {
    _id: "67df89f5ec2e6e61d4c61481",
    categoryId: "67dee99f12d36efdd1027b40",
    image: "/assets/images/02536ab1a554d315fc11f4ef6f9c1302.png",
    name: "Air Skateboard Shoe",
    price: 125,
    stripePriceId: "price_1R5fslJjbWEvglIUv3hn9Qdo",
    description: "Lorem ipsum",
    featured: true,
    __v: 0,
  },
  {
    _id: "67df8ab6ec2e6e61d4c6148f",
    categoryId: "67dee99f12d36efdd1027b40",
    image: "/assets/images/10fd34a19ed897401decf4c2dd4806d5.png",
    name: "High Sole Skateboard Shoe",
    price: 235,
    stripePriceId: "price_1R5fvtJjbWEvglIUU6iFzg4h",
    description: "Lorem ipsum",
    featured: true,
    __v: 0,
  },
  {
    _id: "67df8accec2e6e61d4c61491",
    categoryId: "67dee99f12d36efdd1027b40",
    image: "/assets/images/df950869c406241f2f48f416d0807241.png",
    name: "Basket Shoe",
    price: 125,
    stripePriceId: "price_1R5fwFJjbWEvglIUVm9hT3cQ",
    description: "Lorem ipsum",
    featured: true,
    __v: 0,
  },
  {
    _id: "67df8ba4ec2e6e61d4c61499",
    categoryId: "67dee99f12d36efdd1027b40",
    image: "/assets/images/476b2a224ae85cd40fd6b1c7d34bc9ae.png",
    name: "Sportwear Shoe",
    price: 125,
    stripePriceId: "price_1R5fzjJjbWEvglIUsdz5PhEM",
    description: "Lorem ipsum",
    featured: true,
    __v: 0,
  },
];

const categories = [
  {
    _id: "ALL",
    name: "All",
    slug: "all",
    __v: 0,
  },
  {
    _id: "67dee99f12d36efdd1027b40",
    name: "Shoes",
    slug: "shoes",
    __v: 0,
  },
  {
    _id: "67dee9c012d36efdd1027b43",
    name: "Shorts",
    slug: "shorts",
    __v: 0,
  },
  {
    _id: "67dee9cd12d36efdd1027b45",
    name: "T-shirts",
    slug: "tshirts",
    __v: 0,
  },
  {
    _id: "67deea2812d36efdd1027b47",
    name: "Pants",
    slug: "pants",
    __v: 0,
  },
  {
    _id: "67deea3012d36efdd1027b49",
    name: "Socks",
    slug: "socks",
    __v: 0,
  },
];

export { products, categories };
