'use server'

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

interface TelegramState {
    success: boolean
    message: string
}

export async function sendMessageToTelegram(prevState: TelegramState | undefined, formData: FormData): Promise<TelegramState> {
    const name = formData.get('name') as string
    const address = formData.get('address') as string
    const number = formData.get('number') as string
    const message = formData.get('message') as string

    if (!name || !address || !number || !message) {
        return { success: false, message: 'Iltimos, barcha maydonlarni to‘ldiring!' }
    }

    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error('Telegram keys are missing on server')
        return { success: false, message: 'Server configuration error' }
    }

    const telegramMessage = `👤 Ism Familya: ${name}\n👤 Manzil: ${address}\n📞 Telefon raqam: ${number}\n✉️ Murojaat: ${message}`

    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMessage,
            }),
        })

        if (!response.ok) {
            throw new Error('Telegram API error')
        }

        return { success: true, message: 'Murojaat muvaffaqiyatli yuborildi!' }
    } catch (error) {
        console.error('Telegram send error:', error)
        return { success: false, message: "Murojaat yuborishda xatolik yuz berdi. Keyinroq urinib ko'ring." }
    }
}
