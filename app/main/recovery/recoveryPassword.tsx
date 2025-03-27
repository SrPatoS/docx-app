import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { styles } from './style';
import api from '@/axios/axios';

function RecoveryPassword() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const sendEmail = async () => {
        await api.post('/code/send-code-recovery-password', { email: email });
        Alert.alert('Código de Verificação', 'Código enviado para o email informado');

        handleNextStep();
    }

    const handleSubmit = async () => {
        try {
            const response = await api.put('/update-password-with-recovery-code', {
                email,
                code,
                password,
            });

            if (response.status === 200) {
                Alert.alert('Senha Alterada', 'Senha alterada com sucesso', [
                    { text: 'OK', onPress: () => router.push('/auth/auth') }
                ]);

                setCode('');
                setPassword('');
                setEmail('');
            }
        } catch {
            Alert.alert('Erro', 'Ocorreu um erro ao alterar a senha. Verifique os dados e tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            {step === 1 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.label}>Email de Recuperação</Text>
                    <CustomInput
                        label='Email'
                        icon={'mail'}
                        keyboardType={'email-address'}
                        value={email}
                        placeholder={'Digite seu email'}
                        setValueOutput={setEmail}
                    />
                    <CustomButton title="Próximo" onPress={sendEmail} disabled={!email.includes('@')} />
                    <CustomButton title="Voltar" onPress={() => router.push('/auth/auth')} />
                </View>
            )}

            {step === 2 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.label}>Código de Verificação:</Text>
                    <CustomInput
                        label='Código'
                        icon={'lock'}
                        keyboardType={'numeric'}
                        placeholder={'Digite o código enviado'}
                        value={code}
                        setValueOutput={setCode}
                        onChangeText={setCode}
                    />
                    <CustomButton title="Próximo" onPress={handleNextStep} disabled={!code} />
                    <CustomButton title="Voltar" onPress={handlePreviousStep} />
                </View>
            )}

            {step === 3 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.label}>Nova Senha:</Text>
                    <CustomInput
                        label='Senha'
                        icon={'lock'}
                        value={password}
                        onChangeText={setPassword}
                        setValueOutput={setPassword}
                        placeholder="Digite sua nova senha"
                        secureTextEntry
                        placeholderTextColor="#aaa"
                    />
                    <CustomButton title="Alterar Senha" onPress={handleSubmit} disabled={!password} />
                    <CustomButton title="Voltar" onPress={handlePreviousStep} />
                </View>
            )}
        </View>
    );
}


export default RecoveryPassword;
