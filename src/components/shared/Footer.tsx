import Image from "next/image";
import Link from "next/link";
import {
 Facebook,
 Instagram,
 Youtube,
 Mail,
 Phone,
 MapPin,
 Shield,
 Truck,
 Smartphone,
 Laptop,
 Headphones,
 Watch,
 Gamepad2,
 Zap,
 ArrowRight,
} from "lucide-react";
import paymentBanner from "@/assets/gateway.png";
import { Container } from "../common/container";

const Footer = () => {
 return (
  <footer
   lang='en'
   aria-label='TechGadget Store footer'
   className='bg-black text-white relative overflow-hidden'>
   {/* Background Pattern */}
   <div className='absolute inset-0 opacity-5'>
    <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent'></div>
    <div className='absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl'></div>
    <div className='absolute bottom-0 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl'></div>
   </div>

   <Container className='px-4 sm:px-6 lg:px-8 py-12 relative z-10'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
     {/* Company Info */}
     <div className='space-y-4'>
      <div>
       <Image
        src={"/logo/logo.png"}
        width={350}
        height={350}
        alt='TechGadget Store Logo'
        className='max-w-[100px] lg:max-w-[200px]'
       />
      </div>
      <p className='text-gray-300 text-xs leading-relaxed'>
       Your ultimate destination for cutting-edge technology and premium
       gadgets.
      </p>

      {/* Social Links */}
      <div className='space-y-2'>
       <h5 className='text-white font-semibold text-xs uppercase tracking-wider'>
        Follow Us
       </h5>
       <div className='flex space-x-3'>
        <a
         target='_blank'
         href='#'
         className='w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110'
         aria-label='Facebook'
         rel='noreferrer'>
         <Facebook size={16} />
        </a>
        <a
         href='#'
         className='w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110'
         aria-label='Instagram'>
         <Instagram size={16} />
        </a>
        <a
         href='#'
         className='w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110'
         aria-label='Youtube'>
         <Youtube size={16} />
        </a>
       </div>
      </div>

      {/* Trust Badges */}
      <div className='grid grid-cols-2 gap-2'>
       <div className='flex items-center space-x-1 p-2 bg-gray-900/50 rounded border border-gray-800'>
        <Shield size={12} className='text-green-400' />
        <span className='text-xs text-gray-300'>Secure</span>
       </div>
       <div className='flex items-center space-x-1 p-2 bg-gray-900/50 rounded border border-gray-800'>
        <Truck size={12} className='text-blue-400' />
        <span className='text-xs text-gray-300'>Fast Ship</span>
       </div>
      </div>
     </div>

     {/* Quick Links */}
     <div className='space-y-4'>
      <h4 className='text-white font-semibold text-base flex items-center'>
       <Zap size={16} className='mr-2 text-primary' />
       Quick Links
      </h4>
      <ul className='space-y-2'>
       {[
        "About Us",
        "Contact Support",
        "Help Center",
        "Shipping Info",
        "Order Tracking",
        "Warranty Claims",
       ].map((link) => (
        <li key={link}>
         <Link
          href='#'
          className='text-gray-400 hover:text-primary transition-colors duration-300 text-sm flex items-center group'>
          <ArrowRight
           size={10}
           className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'
          />
          {link}
         </Link>
        </li>
       ))}
      </ul>
     </div>

     {/* Categories */}
     <div className='space-y-4'>
      <h4 className='text-white font-semibold text-base flex items-center'>
       <Smartphone size={16} className='mr-2 text-primary' />
       Categories
      </h4>
      <ul className='space-y-2'>
       {[
        { name: "Smartphones", icon: Smartphone },
        { name: "Laptops", icon: Laptop },
        { name: "Audio", icon: Headphones },
        { name: "Watches", icon: Watch },
        { name: "Gaming", icon: Gamepad2 },
       ].map((category) => (
        <li key={category.name}>
         <Link
          href='#'
          className='text-gray-400 hover:text-primary transition-colors duration-300 text-sm flex items-center group'>
          <category.icon
           size={12}
           className='mr-2 text-gray-500 group-hover:text-primary transition-colors'
          />
          {category.name}
         </Link>
        </li>
       ))}
      </ul>
     </div>

     {/* Contact Info */}
     <div className='space-y-4'>
      <h4 className='text-white font-semibold text-base flex items-center'>
       <Phone size={16} className='mr-2 text-primary' />
       Contact
      </h4>

      <div className='space-y-3'>
       <div className='p-3 bg-gray-900/50 rounded border border-gray-800 hover:border-primary/30 transition-colors'>
        <div className='flex items-start space-x-2'>
         <MapPin size={14} className='text-primary flex-shrink-0 mt-0.5' />
         <div>
          <p className='text-white text-xs font-medium'>Visit Store</p>
          <span className='text-gray-400 text-xs'>Dhaka, Bangladesh</span>
         </div>
        </div>
       </div>

       <div className='p-3 bg-gray-900/50 rounded border border-gray-800 hover:border-primary/30 transition-colors'>
        <div className='flex items-center space-x-2'>
         <Phone size={14} className='text-primary flex-shrink-0' />
         <div>
          <p className='text-white text-xs font-medium'>Call Us</p>
          <span className='text-gray-400 text-xs'>+88012345678970</span>
         </div>
        </div>
       </div>

       <div className='p-3 bg-gray-900/50 rounded border border-gray-800 hover:border-primary/30 transition-colors'>
        <div className='flex items-center space-x-2'>
         <Mail size={14} className='text-primary flex-shrink-0' />
         <div>
          <p className='text-white text-xs font-medium'>Email</p>
          <span className='text-gray-400 text-xs'>support@gadgetglitz.com</span>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </Container>

   {/* Bottom Section */}
   <div className='border-t border-gray-800 bg-gray-900/30 backdrop-blur-sm'>
    <Container className='py-6'>
     <div className='flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0'>
      {/* Payment Methods */}
      <div className='flex flex-col items-center lg:items-start'>
       <div className='flex items-center space-x-2 mb-3'>
        <Shield size={14} className='text-green-400' />
        <span className='text-white font-semibold text-sm'>
         Secure Payments
        </span>
       </div>
       <Image
        src={paymentBanner || "/placeholder.svg"}
        alt='Supported payment methods'
        width={280}
        height={40}
        className='opacity-90 hover:opacity-100 transition-opacity'
       />
       <div className='flex items-center space-x-4 mt-2'>
        <div className='flex items-center space-x-1 text-green-400'>
         <div className='w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse'></div>
         <span className='text-xs'>SSL Protected</span>
        </div>
        <div className='flex items-center space-x-1 text-blue-400'>
         <div className='w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse'></div>
         <span className='text-xs'>PCI Compliant</span>
        </div>
       </div>
      </div>

      {/* Copyright & Links */}
      <div className='flex flex-col items-center lg:items-end space-y-3 text-center lg:text-right'>
       <div className='flex flex-wrap items-center justify-center lg:justify-end gap-4 text-sm'>
        <Link
         href='#'
         className='text-gray-400 hover:text-primary transition-colors hover:underline'>
         Privacy
        </Link>
        <Link
         href='#'
         className='text-gray-400 hover:text-primary transition-colors hover:underline'>
         Terms
        </Link>
        <Link
         href='#'
         className='text-gray-400 hover:text-primary transition-colors hover:underline'>
         Refunds
        </Link>
       </div>

       <div className='flex flex-col items-center lg:items-end space-y-1'>
        <p className='text-gray-300 text-sm'>
         © {new Date().getFullYear()}{" "}
         <span className='font-bold text-white'>Griipbuddy</span>. All rights
         reserved.
        </p>
        <p className='text-gray-500 text-xs'>
         Crafted by{" "}
         <a
          className='font-semibold hover:text-primary transition-colors'
          target='_blank'
          href='https://www.facebook.com/ahmed.nahid.7127'
          rel='noreferrer'>
          Nahid Ahmed
         </a>
        </p>
       </div>
      </div>
     </div>
    </Container>
   </div>
  </footer>
 );
};

export default Footer;
