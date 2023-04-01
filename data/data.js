import bcrypt from "bcryptjs";

const data ={ 
    users: [
        {
            name: 'Arik',
            email: 'arikxl@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name: 'Loola',
            email: 'dy1115@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        },
    ],
    products: [
        {
            title: 'Pearl Robot',
            slug: 'pearl-robot',
            category: 'Robots',
            img: 'https://cdn.leonardo.ai/users/e6eb7fc7-0d31-4c1e-8429-6597969303f1/generations/7accea1b-289b-4d6b-b481-49452aef6269/Leonardo_Select_robot_made_from_pearl_in_a_ocean_background_2.jpg',
            price: 100,
            brand: 'Skynet',
            rating: 3,
            numReviews: 8,
            countInStock: 20,
            desc: 'A robot for digging up pearls'
        },
        {
            title: 'Wood Robot',
            slug: 'wood-robot',
            category: 'Robots',
            img: 'https://cdn.leonardo.ai/users/e6eb7fc7-0d31-4c1e-8429-6597969303f1/generations/063feeeb-f9c1-462c-9f3e-15087dac0fa3/Leonardo_Select_robot_from_wood_2.jpg',
            price: 77,
            brand: 'Groot',
            rating: 4,
            numReviews: 2,
            countInStock: 11,
            desc: 'The new Pinocchio'
        },
        {
            title: 'Grass Robot',
            slug: 'grass-robot',
            category: 'Robots',
            img: 'https://cdn.leonardo.ai/users/e6eb7fc7-0d31-4c1e-8429-6597969303f1/generations/7873cbb4-1f96-4e89-b548-b2d342224d2f/Leonardo_Select_robot_made_from_grass_0.jpg',
            price: 86,
            brand: 'Groot',
            rating: 4.5,
            numReviews: 5,
            countInStock: 17,
            desc: 'A great robot to manage your garden'
        },
        {
            title: 'Coin Car',
            slug: 'coin-car',
            category: 'Cars',
            img: 'https://cdn.leonardo.ai/users/e6eb7fc7-0d31-4c1e-8429-6597969303f1/generations/173cf00b-4fd6-436c-8d93-46cca060883b/Leonardo_Select_car_made_from_coins_1.jpg',
            price: 2211,
            brand: 'Inertia',
            rating: 1.7,
            numReviews: 4,
            countInStock: 2,
            desc: 'Deluxe car'
        },
        {
            title: 'Coffee Automobile',
            slug: 'coffee-automobile',
            category: 'Cars',
            img: 'https://cdn.leonardo.ai/users/e6eb7fc7-0d31-4c1e-8429-6597969303f1/generations/f668ff06-34ab-4e50-bee1-5c36aab2aa87/Leonardo_Select_car_made_from_coffee_1.jpg',
            price: 9999,
            brand: 'Inertia',
            rating: 4,
            numReviews: 12,
            countInStock: 1,
            desc: 'Old fashioned automobile'
        },
        {
            title: 'Pearl Car',
            slug: 'pearl-car',
            category: 'Cars',
            img: 'https://cdn.leonardo.ai/users/e6eb7fc7-0d31-4c1e-8429-6597969303f1/generations/614c1957-1c51-4dc3-a0b3-2761cfc6526b/Leonardo_Select_car_made_from_pearl_in_a_ocean_background_0.jpg',
            price: 1234,
            brand: 'Arikxl',
            rating: 3.5,
            numReviews: 4,
            countInStock: 4,
            desc: 'Submarine car'
        },
    ],
}



export default data;