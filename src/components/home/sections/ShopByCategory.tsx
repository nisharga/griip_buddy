"use client";

import React from 'react';
import {
    Smartphone,
    Laptop,
    Dock,
    PenTool,
    Watch,
    Shield,
    Headphones,
    Cable,
    Headphones as WirelessHeadphones,
    Plug,
    Battery,
    Usb,
    Zap,
    Volume2,
    Headphones as OverheadHeadphones,
    Smartphone as CoverGlass
} from 'lucide-react';
import { Container } from '@/components/common/container';

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
}

const categories: Category[] = [
    {
        id: 'phones-tablets',
        name: 'Phones & Tablets',
        icon: <Smartphone className="lg:size-12 size-8" />
    },
    {
        id: 'macbook',
        name: 'MacBook',
        icon: <Laptop className="lg:size-12 size-8" />
    },
    {
        id: 'hubs-docks',
        name: 'Hubs & Docks',
        icon: <Dock className="lg:size-12 size-8" />
    },
    {
        id: 'stylus',
        name: 'Stylus',
        icon: <PenTool className="lg:size-12 size-8" />
    },
    {
        id: 'smart-watch',
        name: 'Smart Watch',
        icon: <Watch className="lg:size-12 size-8" />
    },
    {
        id: 'watch-strap',
        name: 'Watch Strap',
        icon: <Shield className="lg:size-12 size-8" />
    },
    {
        id: 'airpods',
        name: 'Airpods',
        icon: <Headphones className="lg:size-12 size-8" />
    },
    {
        id: 'wired-headphone',
        name: 'Wired Headphone',
        icon: <Cable className="lg:size-12 size-8" />
    },
    {
        id: 'wireless-headphone',
        name: 'Wireless Headphone',
        icon: <WirelessHeadphones className="lg:size-12 size-8" />
    },
    {
        id: 'power-adapter',
        name: 'Power Adapter',
        icon: <Plug className="lg:size-12 size-8" />
    },
    {
        id: 'power-bank',
        name: 'Power Bank',
        icon: <Battery className="lg:size-12 size-8" />
    },
    {
        id: 'cable-interconnects',
        name: 'Cable & Interconnects',
        icon: <Usb className="lg:size-12 size-8" />
    },
    {
        id: 'wireless-charger',
        name: 'Wireless Charger',
        icon: <Zap className="lg:size-12 size-8" />
    },
    {
        id: 'speakers',
        name: 'Speakers',
        icon: <Volume2 className="lg:size-12 size-8" />
    },
    {
        id: 'overhead-headphones',
        name: 'Overhead Headphones',
        icon: <OverheadHeadphones className="lg:size-12 size-8" />
    },
    {
        id: 'cover-glass',
        name: 'Cover & Glass',
        icon: <CoverGlass className="lg:size-12 size-8" />
    }
];

const ShopByCategory: React.FC = () => {
    return (
        <section className="py-16 ">
            <Container>
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl  text-gray-900 mb-2 tracking-tight">
                        FEATURED CATEGORIES
                    </h2>
                    <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                        Get your desired product from featured category
                    </p>
                </div>

                <div className="grid grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-2.5 lg:gap-y-3">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group flex flex-col items-center p-2 lg:px-6 lg:py-3 bg-[#f6f8fa] rounded-xl  border border-gray-100  transition-all duration-300 cursor-pointer "
                        >

                            <div className="flex items-center justify-center size-10 lg:size-[70px] mb-4 rounded-xl bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300">
                                <div className="text-gray-400 group-hover:text-primary transition-colors duration-300">
                                    {category.icon}
                                </div>
                            </div>

                            {/* Category Name */}
                            <h3 className="lg:text-sm text-[10px] font-medium text-gray-500 text-center leading-tight group-hover:text-primary transition-colors duration-300">
                                {category.name}
                            </h3>
                        </div>
                    ))}
                </div>

            </Container>
        </section>
    );
};

export default ShopByCategory;