import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useReducer } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, FONTS, SIZES, images } from '../constants'
import { MaterialIcons } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'

const initialState = {
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}

const ResetPassword = ({ navigation }) => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result })
        },
        [dispatchFormState]
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 22,
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        style={{
                            tintColor: COLORS.primary,
                            marginVertical: 48,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
                            Redefinir
                        </Text>
                        {/* <Text
                            style={{
                                ...FONTS.h2,
                                color: COLORS.black,
                                marginHorizontal: 8,
                            }}
                        >
                            Your
                        </Text> */}
                        <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
                            Senha
                        </Text>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                        <Input
                            icon="email"
                            iconPack={MaterialIcons}
                            id="email"
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['email']}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                    </View>
                    <Text
                        style={{
                            ...FONTS.body3,
                            textAlign: 'center',
                            marginVertical: 14,
                        }}
                    >
                        Sua redefinição de senha será enviada em seu cadastro
                        e-mail
                    </Text>
                    <Button
                        title="Enviar"
                        filled
                        onPress={() => navigation.navigate('OTPVerification')}
                        style={{
                            width: '100%',
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.primary,
                                marginVertical: 12,
                            }}
                        >
                            Lembrar senha
                        </Text>
                    </TouchableOpacity>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default ResetPassword
