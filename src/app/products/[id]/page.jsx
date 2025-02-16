// app/products/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Star, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { useStore } from '@/app/store/useStore';
import { basicUrl } from '@/app/components/url';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const params = useParams();
  console.log("params:", params)
  const addToCart = useStore((state) => state.addToCart);
  const cart = useStore(state => state.cart);
  const updateQuantity = useStore(state => state.updateQuantity);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Cartitem, setCartItem] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);


  useEffect(() => {
    // Simulating API call with dummy data

    const fetchProduct = async () => {
      // This would be your actual API call 

      const res = await fetch(`${basicUrl}/api/category`)
      const json = await res.json()
      const data = json.data

      const productsArr = data?.map((item) => ({
        ...item, features: [
          "BPA-free materials",
          "Anti-colic vent system",
          "Easy to clean",
          "Dishwasher safe",
        ],
        specifications: {
          "Material": "Premium PP",
          "Capacity": "8 oz / 240ml",
          "Age Range": "0-12 months",
          "Package Contents": "3 bottles, 3 nipples",
        }
      })
      )

      setProduct(productsArr);
      setLoading(false);
    };

    fetchProduct();
  }, [params._id]);
  console.table("Product: ", product)
  console.table("product[0]?.img: ", !product == [] && product[0].img)

  // const handleQuantityChange = (action) => {
  //   if (action === 'increase' && quantity < product?.stock) {
  //     setCartItem(prev => prev + 1);
  //   } else if (action === 'decrease' && quantity > 1) {
  //     setCartItem(prev => prev - 1);
  //   }
  // };

  if (loading && product == []) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-pink-600 border-t-2 border-b-2 rounded-full w-32 h-32 animate-spin"></div>
      </div>
    );
  }


  const index = product && product?.findIndex((item) => item?._id == params.id)
  useEffect(() => {
    console.log("select: ", index, selectedImage);
    index && setSelectedImage(index)
  }, [index])

    const cartItem = product && cart.find((item) => item._id == product[selectedImage]._id)
    useEffect(() => {
      console.log("CartItems: ", cartItem, cart)
      product && setCartItem(() => cartItem)
    }, [cartItem, Cartitem])
    console.log("CartItems hh : ", Cartitem)
    
  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <section className='flex md:flex-row flex-col justify-evenly'>
                <div className='flex md:flex-col gap-[15px] w-[100%] md:w-[25%] md:h-[750px] overflow-x-scroll md:overflow-x-hidden overflow-y-scroll scrollbar-custom' >
                  {product && product.map((_, i) => (
                    <div key={i} className={`flex justify-center flex-shrink-0  items-center  border-[2px] rounded-lg md:w-[100%] w-[100px] h-[120px]  md:h-[137px] ${selectedImage === i ? 'border-[#ca3d61]' : 'border-[#e5e7eb]'}  `}
                      onClick={() => setSelectedImage(i)}
                    >
                      <  img
                        src={product && !product == [] && _?.img}
                        alt={product && !product == [] && _?.title}
                        fill
                        className="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="relative flex justify-center items-center rounded-lg md:w-[80%] aspect-h-1 aspect-w-1 overflow-hidden">
                  <  img
                    src={product && !product == [] && product[selectedImage]?.img}
                    alt={product && !product == [] && product[selectedImage]?.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </section>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-bold text-gray-900 text-3xl">{!product == [] && product[selectedImage]?.title}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(!product == [] && product[selectedImage]?.rate)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">
                    {!product == [] && product[selectedImage]?.rate} ({!product == [] && product[selectedImage]?.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-600">{!product == [] && product[selectedImage]?.description}</p>

              <div className="font-bold text-pink-600 text-3xl">
                ${!product == [] && product[selectedImage]?.price}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => updateQuantity(Cartitem?._id, Cartitem?.quantity - 1)}
                      className="hover:bg-gray-100 p-2"
                      disabled={Cartitem && Cartitem?.quantity <= 1}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="px-4 py-2 border-x">{Cartitem?.quantity ? Cartitem?.quantity : 0}</span>
                    <button
                      onClick={() => updateQuantity(Cartitem?._id, Cartitem?.quantity + 1)}
                      className="hover:bg-gray-100 p-2"
                      disabled={Cartitem && Cartitem?.quantity >= !product && product[selectedImage]?.stock}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {!product == [] && product[selectedImage]?.stock} items available
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => addToCart(product[selectedImage])}
                    className="flex flex-1 justify-center items-center space-x-2 bg-pink-600 hover:bg-pink-700 py-3 rounded-md text-white transition-colors"
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  <button className="hover:bg-gray-50 p-3 border rounded-md">
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="mb-2 font-semibold text-lg">Key Features</h3>
                <ul className="space-y-1 list-disc list-inside">
                  {!product == [] && product[selectedImage]?.features?.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="mb-2 font-semibold text-lg">Specifications</h3>
                <div className="border rounded-md">
                  {product && Object.entries(product[selectedImage].specifications).map(([key, value], index) => (
                    <div
                      key={key}
                      className={`flex ${index !== 0 ? 'border-t' : ''
                        }`}
                    >
                      <div className="bg-gray-50 p-3 w-1/3 font-medium">
                        {key}
                      </div>
                      <div className="p-3 w-2/3">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}