import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { auth } from '@/firebase/clientApp';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FIREBASE_ERRORS } from '@/firebase/errors';

const SignUp: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [signUpForm, setSignUpForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');

    const [createUserWithEmailAndPassword, user, loading, userError] =
        useCreateUserWithEmailAndPassword(auth);

    // Firebase logic
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) setError('');
        if (!signUpForm.email.includes('@')) {
            return setError('Please enter a valid email');
        }
        if (signUpForm.password.length < 8) {
            return setError('Password must be at least 8 characters');
        }
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!signUpForm.password.match(/[A-Z]/g)) {
            return setError(
                'Password should contain at least one upper case letter'
            );
        }
        if (!signUpForm.password.match(/[a-z]/g)) {
            return setError(
                'Password should contain at least one lower case letter'
            );
        }
        if (!signUpForm.password.match(/[0-9]/g)) {
            return setError('Password should contain at least one number');
        }

        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // update form state
        setSignUpForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name="email"
                placeholder="email"
                type="email"
                mb={2}
                onChange={onChange}
                fontSize="10pt"
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500',
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500',
                }}
                bg="gray.50"
            />
            <Input
                required
                name="password"
                placeholder="password"
                type="password"
                onChange={onChange}
                mb={2}
                fontSize="10pt"
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500',
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500',
                }}
                bg="gray.50"
            />
            <Input
                required
                name="confirmPassword"
                placeholder="confirm password"
                type="password"
                onChange={onChange}
                mb={2}
                fontSize="10pt"
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500',
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500',
                }}
                bg="gray.50"
            />
            {(error || userError) && (
                <Text mb={1} textAlign="center" color="red" fontSize="10pt">
                    {error ||
                        FIREBASE_ERRORS[
                            userError?.message as keyof typeof FIREBASE_ERRORS
                        ]}
                </Text>
            )}
            <Button
                width={'100%'}
                height={'36px'}
                mt={2}
                mb={2}
                type="submit"
                isLoading={loading}
            >
                Sign Up
            </Button>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>Already a redditor?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: 'login',
                        }))
                    }
                >
                    LOG IN
                </Text>
            </Flex>
        </form>
    );
};

export default SignUp;
