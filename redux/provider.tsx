'use client'

import {store} from '@/redux/store';
import {Provider} from 'react-redux';

interface CustomProviderProps {
    children: React.ReactNode
}
export default function CustomProvider({
    children
}: CustomProviderProps) {
    return <Provider store={store}>{children}</Provider>
}