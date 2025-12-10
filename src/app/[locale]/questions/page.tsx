import React from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/app/[locale]/components/ui/accordion'

function Page() {
	return (
		<div className='max-w-7xl mx-auto'>
			<Accordion type='single' collapsible>
				<AccordionItem value='item-1'>
					<AccordionTrigger>Biz kimmiz</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				{/*  */}
				<AccordionItem value='item-2'>
					<AccordionTrigger>Biz bilan bog`lanish</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				{/*  */}
				<AccordionItem value='item-3'>
					<AccordionTrigger>Biz qanday ishlar olib boramiz?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				{/*  */}
				<AccordionItem value='item-4'>
					<AccordionTrigger>
						Biz haqimizda qanday bilish mumkun?
					</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				{/*  */}
				<AccordionItem value='item-5'>
					<AccordionTrigger>Biz bilan kimlar ishlaydi?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				{/*  */}
				<AccordionItem value='item-6'>
					<AccordionTrigger>Biz kimlar bilan hamkor bolamiz?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				{/*  */}
				<AccordionItem value='item-7'>
					<AccordionTrigger>Biz haqimzida malumot bilish?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				{/*  */}
				<AccordionItem value='item-8'>
					<AccordionTrigger>Biz qanday companya miz?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

export default Page
