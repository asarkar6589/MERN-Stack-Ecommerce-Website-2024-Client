import { cartItemsType } from "./initialState-types"

// For registration
export interface RegistrationResponse {
    success: boolean,
    message: string
}
export interface UserForRegistration {
    formData: FormData
}


// For login
export interface LoginResponse {
    success: boolean,
    message: string,
    user: User
}
export interface UserForLogin {
    email: string,
    password: string
}

// for logout
export interface LogoutResponse {
    success: boolean,
    message: string
}


// For getting user profile
export interface User {
    _id: string,
    name: string,
    number: number,
    dob: Date,
    email: string,
    password: string,
    gender: "Male" | "Female",
    photo: string,
    role: "User" | "Admin",
    createdAt: Date, // Because of timestamps, this will also come.
    updatedAt: Date // Because of timestamps, this will also come.
}
export interface getProfileResponse {
    success: boolean,
    user: User
}


// for getting info of all users by admin
export interface getAllUsers {
    success: boolean,
    users: User[]
}



// for deleting user
export interface DeleteUserResponse {
    success: boolean,
    message: string
}


// for loging out user.
export interface getLogoutResponse {
    success: boolean,
    message: string
}


// Updating user
export interface UpdateUserResponse {
    success: boolean,
    message: string
}
export interface UpdateUserBody {
    id: string,
    formData: FormData
}


// for getting feedback from the user.
export interface GetFeedbackResponse {
    success: boolean,
    message: string
}
export interface GetFeedbackBody {
    rating: number,
    feedback: string
}

// for getting product response
export interface Product {
    _id:string,
    name: string,
    stock: number,
    photo: string, 
    category: string,
    brand: string,
    description: string,
    price: number,
    createdAt: Date, // Because of timestamps, this will also come.
    updatedAt: Date // Because of timestamps, this will also come.
}
export interface latestProductResponse {
    success: boolean,
    products: Product
}



// for getting single product infromation.
export interface singleProductResponse {
    success: boolean,
    product:Product
}



// Seach Product Response 
export interface SearchProductResponse {
    success:boolean,
    products: Product[],
    total_pages: number,
}
export interface SearchProductBodyInput {
    name?: string,
    sort?: string,
    price?: number,
    category?: string,
    brand?: string,
    page?: number
}


// For all brands
export interface AllBrandsResponse {
    success:boolean,
    brands: string[]
}


// For all categories
export interface AllCategoriesResponse {
    success:boolean,
    category: string[]
}



// for posting comments
export interface newCommentResponse {
    success: boolean,
    message: string
}
export interface newCommentBody {
    title: string,
    description: string,
    productId: string,
}



// for getting comments
interface user {
    name: string,
    photo: string,
    _id: string
}
export interface Comment {
    _id:string,
    user: user, 
    product: string,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
}
export interface GetCommentsResponse {
    success: boolean,
    comments: Comment[], 
}
export interface GetCommentBody {
    product: string
}


// for deleting comments
export interface DeleCommentResponse {
    success: boolean,
    message: string
}
export interface DeleteCommentBody {
    comment_id: string,
    user_id: string
}


// for getting commentById
export interface GetCommentByIdResponse {
    success: boolean,
    comment: Comment
}
export interface GetCommentByIdBody {
    id: string
}


// for updating commnets
export interface UpdateCommentResponse {
    success: boolean,
    message: string
}
export interface UpdateCommentBody {
    id: string,
    title: string,
    description: string
}


// getting admin prodcuts
export interface AdminProductsResponse {
    success: boolean,
    products: Product[] | Product,
    len: number
}



// for creating new product.
export interface newProductResponse {
    success: boolean,
    message: string
}
export interface newProductBody {
    formData: FormData
}



// for updating product.
export interface UpdateProductResponse {
    success: boolean,
    message: string
}
export interface UpdateProductBody {
    id: string,
    formData: FormData
}




// delete product response
export interface DeleteProductResponse {
    success: boolean,
    message: string
}




// for admins to make coupons
export interface CreateNewCouponResponse {
    success: boolean,
    message: string
}
export interface CreateCouponBody {
    name: string,
    discount: number
}



// for getting All the coupons
export interface CouponType {
    _id?: string
    name: string,
    discount: number
}
export interface GetAllCouponsResponse {
    success: boolean,
    coupons: CouponType[]
}



// for getting coupon by id
export interface GetCouponByIdResponse {
    success: boolean,
    coupon: CouponType
}


// updating the coupon
export interface UpdateCouponByIdResponse {
    success: boolean,
    message: string
}
export interface UpdateCouponBody {
    id: string,
    name?: string,
    discount?: number,
}



// deleting coupon
export interface DeleteCouponByIdResponse {
    success: boolean,
    message: string
}



// for checking coupon
export interface CheckCouponResponse {
    success: boolean,
    discount: number
}




// for placing new order
export interface NewOrderResponse {
    success: boolean,
    message: string
}
export interface OrderdProduct {
    id: string,
    quantity: number,
    name: string,
    price: number,
    photo: string,
    stock: number
}
export interface OrderAddress {
    address: string,
    city: string,
    country: string,
    pinCode: number | undefined
}
export interface NewOrderBody {
    product: cartItemsType[],
    discount: number,
    subTotal: number,
    shippingCharges: number,
    tax: number,
    shippingAddress: OrderAddress,
    user: string,
    total: number
}



// for getting order by user.
export interface Order {
    _id: string,
    user: {
        name: string,
        photo: string,
        number: number,
    },
    product: OrderdProduct[],
    discount: number,
    subTotal: number,
    shippingCharges: number,
    tax: number,
    total: number,
    shippingAddress: OrderAddress,
    createdAt: Date,
    status: "Processing" | "Shipped" | "Deliverd"
}
export interface GetOrderByUserResponse {
    success: boolean,
    orders: Order[]
}


// getting order by id by admin
export interface GetOrderByIdAdminResponse {
    success: boolean,
    order: Order
}

// Updating the order by admin
export interface GetUpdateOrderByAdminResponse {
    success: boolean,
    message: string
}



// deleting the order by user
export interface GetDeleteOrderByUserResponse {
    success: boolean,
    message: string
}




// for new payement
export interface NewPayementResponse {
    success: boolean,
    clinet_secret: string
}
export interface NewPayementBody {
    amount: number
}



// For getting all the cancelled orders by admins
export interface CancelledOrder extends Order {
    refundStatus: "Processing" | "Refunded"
}
export interface GetAllCancelledOrdersByAdminResponse {
    success: boolean,
    orders: CancelledOrder[]
}



// for getting info of a single cancelled order.
export interface GetCancelledOrdersByIdResponse {
    success: boolean,
    order: CancelledOrder
}



// for getting stats (pie)
interface PieInfo {
    orderCount: {
        Processing: number,
        Shipped: number,
        Deliverd: number,
        Cancelled: number
    },
    stock: {
        outofStockProductsCount: number,
        inStockPorductsCount: number
    },
    categoryCount: Record<string, number>[],
    peopleCount: {
        admin: number,
        customer: number
    }
    peopleAgeCount: {
        Teen: number,
        Adult: number,
        Old: number
    },
    revenueDistribution: {
        NetMargin: number;
        Discount: number;
        ShippingCost: number;
        Burnt: number;
        MarketingCost: number;
    }
}
export interface GetPieStatsResponse {
    success: boolean,
    pie: PieInfo
}



// for getting bar chart data
export interface GetBarChartResponse {
    success: boolean,
    Products: number[],
    Users: number[],
    Orders: number[],
    CancelledOrders: number[],
}



// for getting line chart data
export interface GetLineChartData {
    success: boolean,
    Users: number[],
    Revenue: number[],
    Discount: number[],
    Products: number[]
}


// for getting dashboard data 
export interface transactionsCountArrayType {
    _id: string,
    discount: number,
    total: number,
    status: string
}
interface StatsType {
    changePercentage: {
        product: number,
        user: number,
        order: number,
        revenue: number,
    },
    count: {
        product: number,
        users: number,
        order: number,
        revenue: number
    },
    chart: {
        lastSixMonthsRevenueArr: number[],
        lastSixMonthsOrderArr: number[]
    },
    inventory: Record<string, number>[],
    gender: {
        Male: number,
        Female: number,
        Others: number
    },
    transactionsCount: transactionsCountArrayType[]
}
export interface GetDashboardData {
    success: boolean,
    stats: StatsType
}
