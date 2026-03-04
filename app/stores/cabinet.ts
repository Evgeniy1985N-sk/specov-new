import { defineStore } from 'pinia'
import type {
  Company,
  Manager,
  Credit,
  Order,
  OrderProduct,
  Discount,
  Contract,
  Appeal,
  User,
  Address,
  Promocode,
  ContactData,
  OrganizationData
} from '~/types/cabinet'

export const useCabinetStore = defineStore('cabinet', () => {
  // Company data
  const company = ref<Company>({
    name: 'ООО «Спецов»',
    inn: '9729198725',
    kpp: '772801001'
  })

  // Manager data
  const manager = ref<Manager>({
    name: 'Прокопьева Ирина Сергеевна',
    phone: '+8 (922) 107-92-77',
    email: 'i.prokopeva@instrument.ru'
  })

  // Credit data
  const credit = ref<Credit>({
    available: 530712.27,
    total: 1000000,
    general: 469287.73,
    overdue: 0
  })

  // Orders data
  const orders = ref<Order[]>([
    { id: '481439875', date: '15 августа', amount: 9874.92, status: 'Готов к выдаче', statusColor: 'green' },
    { id: '481439875', date: '8 августа', amount: 9874.92, status: 'В обработке', statusColor: 'orange' }
  ])

  // Discounts data
  const discounts = ref<Discount[]>([
    { percent: 24, category: 'Силовое оборудование' },
    { percent: 22, category: 'Ручной инструмент' }
  ])

  // Contract data
  const contract = ref<Contract>({
    number: '102859103',
    period: 'с 22 января 2016 по 31 декабря 2050',
    prolongation: 'Нет',
    paymentDelay: '30 дней',
    productLimit: '0.00 ₽',
    remainingLimit: '0.00 ₽'
  })

  // Appeals data
  const appeals = ref<Appeal[]>([
    {
      id: '1',
      date: '15 августа',
      status: 'В работе',
      title: 'Поддержка по работе личного кабинета',
      text: 'Добрый день. Не работает строка поиска. Хоть по наименованию, хоть по артикулу пишет товар не найден. Через каталог так же не могу найти нужный товар, пишет такого нет',
      isRead: false,
      messages: [
        {
          id: '1',
          sender: 'user',
          senderName: 'Вы',
          text: 'Добрый день. Не работает строка поиска. Хоть по наименованию, хоть по артикулу пишет товар не найден. Через каталог так же не могу найти нужный товар, пишет такого нет',
          timestamp: '15 августа 09:20:59'
        },
        {
          id: '2',
          sender: 'manager',
          senderName: 'ООО «Спецов»',
          senderRole: 'Персональный менеджер',
          text: 'Добрый день. Не очень понимаем в чем проблема?',
          timestamp: '15 августа 10:38:56'
        }
      ]
    },
    {
      id: '2',
      date: '11 августа',
      status: 'Закрыто',
      title: 'Другое',
      text: 'Добрый день. Не работает строка поиска. Хоть по наименованию, хоть по артикулу пишет товар не найден. Через каталог так же не могу найти нужный товар, пишет такого нет',
      isRead: true,
      messages: [
        {
          id: '1',
          sender: 'user',
          senderName: 'Вы',
          text: 'Добрый день. Не работает строка поиска. Хоть по наименованию, хоть по артикулу пишет товар не найден. Через каталог так же не могу найти нужный товар, пишет такого нет',
          timestamp: '11 августа 10:15:32'
        },
        {
          id: '2',
          sender: 'manager',
          senderName: 'ООО «Спецов»',
          senderRole: 'Персональный менеджер',
          text: 'Добрый день. Не очень понимаем в чем проблема?',
          timestamp: '15 августа 10:38:56'
        }
      ]
    }
  ])

  // Users data
  const users = ref<User[]>([
    {
      id: '1',
      fullName: 'Мейко Виталий Иванович',
      email: 'mvi@spetsov.ru',
      phone: '+7 (982) 934-47-88',
      blocked: false
    },
    {
      id: '2',
      fullName: 'Рыжкова Евгения Валерьевна',
      email: 'zakup3@spetsov.ru',
      phone: '+7 (906) 873-39-98',
      blocked: false
    },
    {
      id: '3',
      fullName: 'Ткачук А.Н',
      email: 'zakup1@spetsov.ru',
      phone: '+7 (912) 928-36-51',
      blocked: false
    },
    {
      id: '4',
      fullName: 'Волосникова Мария Николаевна',
      email: 'zakup2@spetsov.ru',
      phone: '+7 (345) 258-18-60',
      blocked: false
    }
  ])

  // Addresses data (in-memory only)
  const addresses = ref<Address[]>([
    {
      id: '1',
      title: 'Адрес',
      address: 'ООО Спецов 625013, Тюменская обл, г Тюмень, ул 50 лет Октября, д. 118а',
      code: 'EK-00045450',
      sms: {
        enabled: true,
        phone: '+7 (345) 258-18-63'
      },
      email: {
        enabled: true,
        address: 'info@spetsov.ru'
      }
    }
  ])

  const saveAddresses = (newAddresses: Address[]) => {
    // Keep API for pages/components, but don't persist to localStorage
    addresses.value = [...newAddresses]
  }

  // Promocodes data
  const promocodes = ref<Promocode[]>([
    {
      title: '-30% на первый заказ для юрлиц',
      date: 'до 31 августа',
      condition: 'на заказ от 500₽',
      description: 'Максимальная скидка по промокоду — 3000 рублей. Суммируется с другими акциями',
      code: 'GET400',
      label: 'Промокод'
    },
    {
      title: 'Скидка 5% на выделенные бренды',
      date: 'до 31 августа',
      condition: '',
      description: 'Максимальная скидка по промокоду — 5000 рублей. Суммируется с другими акциями. Не действует на заказы юрлиц. Список брендов: Inforce, Gigant, Grizzly, AEG, Ryobi, KEYANG, SHTOK, DCA, Atlet, NEO Tools, Topex, Top Tools, Graphite, QBRICK, KENDO, Mundial, Richip, Sata, Sjal, Senci, Bucktool, X-MAX, EX KASEI, TRUEGREEN, LIFAN, Richip, Worten.',
      code: 'PROMO5000',
      label: 'Промокод'
    },
    {
      title: '-3000 рублей на первый заказ от 10 000 рублей для b2b-клиента',
      date: 'до 31 августа',
      condition: 'для заказов от 10 000 до 29 999 рублей',
      description: 'Оформите заказ на сумму от 10 000 до 29 999 рублей и получите выгоду.',
      code: 'B2B3000',
      label: 'Промокод'
    }
  ])

  // Contact data
  const contactData = ref<ContactData>({
    contactPerson: 'mari_143@mail.ru',
    phone: '+7 (345) 258-18-63',
    email: 'info@spetsov.ru'
  })

  // Organization data
  const organizationData = ref<OrganizationData>({
    name: 'СПЕЦОВ ООО',
    inn: '7204059728',
    personalId: '133019',
    clientCode1C: '15554',
    branch: 'Филиал в Екатеринбурге'
  })

  // Discounts with icons (for discounts page)
  const discountsWithIcons = ref<Discount[]>([
    {
      percent: '24%',
      category: 'Силовое оборудование',
      icon: '/image/cabinet/power-equipment.svg',
      bgColor: 'bg-[#FEE4E2]'
    },
    {
      percent: '22%',
      category: 'Ручной инструмент',
      icon: '/image/cabinet/hand-tools.svg',
      bgColor: 'bg-[#F5F1DF]'
    }
  ])

  // Orders with products (for orders page)
  const products: OrderProduct[] = [
    { article: '67502', name: 'Ведро гибкое сверхпрочно...', image: '/image/products/img-13.png', quantity: 80, pricePerUnit: 217.60, sum: 25600.00, discount: 32, toPay: 17408.00 },
    { article: '80881', name: 'Валик для внутренних раб...', image: '/image/products/img-14.png', quantity: 30, pricePerUnit: 134.94, sum: 5190.00, discount: 22, toPay: 4048.20 },
    { article: '85510', name: 'Шпательная лопатка из не...', image: '/image/products/img-15.png', quantity: 20, pricePerUnit: 127.56, sum: 3270.80, discount: 22, toPay: 2551.20 }
  ]

  interface OrdersWithProductsOrder {
    id: string
    date: string
    amount: number
    total: number
    status: string
    statusColor: 'green' | 'orange'
    productCount: number
    user: string | null
    email: string | null
    products: OrderProduct[]
    showRepeatButton?: boolean
  }

  const ordersWithProducts = ref<OrdersWithProductsOrder[]>([
    {
      id: '481439875',
      date: '15 августа',
      productCount: 2,
      user: 'Волосникова Мария',
      email: null,
      amount: 9874.92,
      total: 9874.92,
      status: 'Готов к выдаче',
      statusColor: 'green',
      products: products
    },
    {
      id: '481439875',
      date: '15 августа',
      productCount: 13,
      user: null,
      email: 'mari_143@mail.ru',
      amount: 9874.92,
      total: 9874.92,
      status: 'Готов к выдаче',
      statusColor: 'green',
      products: products
    },
    {
      id: '481439875',
      date: '15 августа',
      productCount: 3,
      user: null,
      email: 'mari_143@mail.ru',
      amount: 9874.92,
      total: 9874.92,
      status: 'Готов к выдаче',
      statusColor: 'green',
      products: products
    },
    {
      id: '481439875',
      date: '15 августа',
      productCount: 13,
      user: null,
      email: 'mari_143@mail.ru',
      amount: 9874.92,
      total: 9874.92,
      status: 'Готов к выдаче',
      statusColor: 'green',
      showRepeatButton: true,
      products: products
    }
  ])

  // Methods
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price).replace(',', ',') + ' ₽'
  }

  const creditPercent = computed(() => {
    return (credit.value.available / credit.value.total) * 100
  })

  const generateCode = (): string => {
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(8, '0')
    return `EK-${randomNum}`
  }

  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  const addAddress = (address: Omit<Address, 'id' | 'code'>) => {
    const newAddress: Address = {
      id: generateId(),
      code: generateCode(),
      ...address
    }
    addresses.value.push(newAddress)
    saveAddresses(addresses.value)
    return newAddress
  }

  const deleteAddress = (addressId: string) => {
    addresses.value = addresses.value.filter(addr => addr.id !== addressId)
    saveAddresses(addresses.value)
  }

  const toggleUserBlock = (userId: string) => {
    const user = users.value.find(u => u.id === userId)
    if (user) {
      user.blocked = !user.blocked
    }
  }

  const addUser = (userData: { fullName: string; phone: string; email: string; seesOnlyOwnOrders?: boolean }) => {
    const newUser: User = {
      id: generateId(),
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      blocked: false
    }
    users.value.push(newUser)
    return newUser
  }

  const updateContactData = (data: Partial<ContactData>) => {
    contactData.value = { ...contactData.value, ...data }
  }

  const addAppealMessage = (appealId: string, text: string) => {
    const appeal = appeals.value.find(a => a.id === appealId)
    if (appeal) {
      const now = new Date()
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
      const timestamp = `${now.getDate()} ${months[now.getMonth()]} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

      appeal.messages.push({
        id: generateId(),
        sender: 'user',
        senderName: 'Вы',
        text,
        timestamp
      })
    }
  }

  return {
    // State
    company,
    manager,
    credit,
    orders,
    discounts,
    contract,
    appeals,
    users,
    addresses,
    promocodes,
    contactData,
    organizationData,
    discountsWithIcons,
    ordersWithProducts,
    // Computed
    creditPercent,
    // Methods
    formatPrice,
    generateCode,
    generateId,
    addAddress,
    deleteAddress,
    toggleUserBlock,
    addUser,
    updateContactData,
    saveAddresses,
    addAppealMessage
  }
})

