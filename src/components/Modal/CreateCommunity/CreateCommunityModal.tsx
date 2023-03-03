import * as React from 'react';
import { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from '@chakra-ui/react';
import { HiLockClosed } from 'react-icons/hi';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { auth, firestore } from '@/firebase/clientApp';
import { doc, getDoc, serverTimestamp, setDoc } from '@firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
    open,
    handleClose,
}) => {
    const [user] = useAuthState(auth);
    const [communityName, setCommunityName] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState('public');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return;
        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length);
    };

    const onCommunityTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCommunityType(event.target.name);
    };

    const handleCreateCommunity = async () => {
        // validate the community name
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (format.test(communityName) || communityName.length < 3) {
            setError(
                'Community name must be between 3-21 characters, and can only obtain letters, numbers and underscore.'
            );
            return;
        }
        setLoading(true);

        try {
            const communityDocRef = doc(
                firestore,
                'communities',
                communityName
            );

            // Check if the community exists in db
            const communityDoc = await getDoc(communityDocRef);

            if (communityDoc.exists()) {
                throw new Error(
                    `Sorry, the r/${communityName} is already taken, try another one`
                );
                return;
            }

            // create the document
            await setDoc(communityDocRef, {
                creatorId: user?.uid,
                createdAt: serverTimestamp(),
                numberOfMembers: 1,
                privacyType: communityType,
            });
        } catch (error: any) {
            console.log('handleCreateCommunity error', error);
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        display="flex"
                        flexDirection="column"
                        padding={3}
                        fontSize={15}
                    >
                        Create a community
                    </ModalHeader>
                    <Box pl={3} pr={3}>
                        <ModalCloseButton />
                        <ModalBody
                            display="flex"
                            flexDirection="column"
                            padding="10px 0"
                        >
                            <Text fontWeight={600} fontSize={15}>
                                Name
                            </Text>
                            <Text fontSize={11} color="gray.500">
                                Community names including capitalization cannot
                                be changed
                            </Text>
                            <Text
                                position="relative"
                                top="28px"
                                width="20px"
                                left="10px"
                                color="gray.400"
                            >
                                /r
                            </Text>
                            <Input
                                position="relative"
                                value={communityName}
                                size="sm"
                                pl="22px"
                                onChange={handleChange}
                            />
                            <Text
                                fontSize="9pt"
                                color={
                                    charsRemaining === 0 ? 'red' : 'gray.500'
                                }
                            >
                                {charsRemaining} characters remaining
                            </Text>
                            <Text fontSize="9pt" color="red" pt={1}>
                                {error}
                            </Text>
                            <Box>
                                <Text fontWeight={600} fontSize={15}>
                                    Community Type
                                </Text>
                                <Stack spacing={2}>
                                    <Checkbox
                                        name="public"
                                        isChecked={communityType === 'public'}
                                        onChange={onCommunityTypeChange}
                                    >
                                        <Flex align="center">
                                            <Icon
                                                as={BsFillPersonFill}
                                                color="gray.500"
                                                mr={2}
                                            />
                                            <Text
                                                fontSize="10pt"
                                                mr={1}
                                                width="65px"
                                            >
                                                Public
                                            </Text>
                                            <Text
                                                fontSize="8pt"
                                                color="gray.500"
                                            >
                                                Anyone can view, post and
                                                comment to this community
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox
                                        name="restricted"
                                        isChecked={
                                            communityType === 'restricted'
                                        }
                                        onChange={onCommunityTypeChange}
                                    >
                                        <Flex align="center">
                                            <Icon
                                                as={BsFillEyeFill}
                                                color="gray.500"
                                                mr={2}
                                            />
                                            <Text
                                                fontSize="10pt"
                                                mr={1}
                                                width="65px"
                                            >
                                                Restricted
                                            </Text>
                                            <Text
                                                fontSize="8pt"
                                                color="gray.500"
                                            >
                                                Anyone can view this community,
                                                but only approved users can post
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox
                                        name="private"
                                        isChecked={communityType === 'private'}
                                        onChange={onCommunityTypeChange}
                                    >
                                        <Flex align="center">
                                            <Icon
                                                as={HiLockClosed}
                                                color="gray.500"
                                                mr={2}
                                            />
                                            <Text
                                                fontSize="10pt"
                                                mr={1}
                                                width="65px"
                                            >
                                                Private
                                            </Text>
                                            <Text
                                                fontSize="8pt"
                                                color="gray.500"
                                            >
                                                Only approved users can view and
                                                submit to this community
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                </Stack>
                            </Box>
                        </ModalBody>
                    </Box>
                    <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
                        <Button
                            variant="outline"
                            height="30px"
                            mr={3}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            height="30px"
                            onClick={handleCreateCommunity}
                            isLoading={loading}
                        >
                            Create Community
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateCommunityModal;
