export interface Company {
    name: string
    inn: string
    kpp: string
}

export interface Manager {
    name: string
    phone: string
    email: string
}

export interface Credit {
    available: number
    total: number
    general: number
    overdue: number
}

export interface Order {
    id: string
    date: string
    amount: number
    total?: number
    status: string
    statusColor: 'green' | 'orange'
    productCount?: number
    user?: string | null
    email?: string | null
    products?: OrderProduct[]
    showRepeatButton?: boolean
}

export interface OrderProduct {
    article: string
    name: string
    image: string
    quantity: number
    pricePerUnit: number
    sum: number
    discount: number
    toPay: number
}

export interface Discount {
    percent: number | string
    category: string
    icon?: string
    bgColor?: string
}

export interface Contract {
    number: string
    period: string
    prolongation: string
    paymentDelay: string
    productLimit: string
    remainingLimit: string
}

export interface AppealMessage {
    id: string
    sender: 'user' | 'manager'
    senderName: string
    senderRole?: string
    text: string
    timestamp: string
}

export interface Appeal {
    id: string
    date: string
    status: 'В работе' | 'Закрыто'
    title: string
    text: string
    isRead: boolean
    messages: AppealMessage[]
}

export interface User {
    id: string
    fullName: string
    email: string
    phone: string
    blocked: boolean
}

export interface Address {
    id: string
    title: string
    address: string
    code: string
    sms: {
        enabled: boolean
        phone: string
    }
    email: {
        enabled: boolean
        address: string
    }
}

export interface Promocode {
    title: string
    date: string
    condition: string
    description: string
    code: string
    label: string
}

export interface ContactData {
    contactPerson: string
    phone: string
    email: string
}

export interface OrganizationData {
    name: string
    inn: string
    personalId: string
    clientCode1C: string
    branch: string
}

export interface PasswordData {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

