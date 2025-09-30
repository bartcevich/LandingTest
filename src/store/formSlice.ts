import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormState {
  phone: string
  isLoading: boolean
  error: string | null
  success: boolean
}

const initialState: FormState = {
  phone: '',
  isLoading: false,
  error: null,
  success: false,
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload
    },
    resetForm: (state) => {
      state.phone = ''
      state.isLoading = false
      state.error = null
      state.success = false
    },
  },
})

export const { setPhone, setLoading, setError, setSuccess, resetForm } = formSlice.actions
export default formSlice.reducer