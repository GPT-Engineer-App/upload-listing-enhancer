import React, { useState } from "react";
import { Box, Button, List, ListItem, ListIcon, Heading, Input, VStack, HStack, Text, useToast } from "@chakra-ui/react";
import { FaFileAlt, FaTrashAlt, FaUpload } from "react-icons/fa";

const Index = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      setFiles([...files, selectedFile]);
      setSelectedFile(null);
      toast({
        title: "File uploaded.",
        description: `${selectedFile.name} uploaded successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "No file selected.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to handle file deletion
  const handleDelete = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
    toast({
      title: "File deleted.",
      description: `${fileName} deleted successfully.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} p={8}>
      <Heading as="h1" size="xl">
        File Upload & Listing
      </Heading>
      <HStack>
        <Input type="file" onChange={handleFileChange} />
        <Button leftIcon={<FaUpload />} colorScheme="blue" onClick={handleUpload}>
          Upload
        </Button>
      </HStack>
      <Box w="full">
        <Heading as="h2" size="lg" mb={4}>
          Uploaded Files
        </Heading>
        {files.length > 0 ? (
          <List spacing={3}>
            {files.map((file, index) => (
              <ListItem key={index} d="flex" justifyContent="space-between" alignItems="center">
                <HStack>
                  <ListIcon as={FaFileAlt} color="green.500" />
                  <Text>{file.name}</Text>
                </HStack>
                <Button size="sm" leftIcon={<FaTrashAlt />} colorScheme="red" onClick={() => handleDelete(file.name)}>
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Text>No files uploaded yet.</Text>
        )}
      </Box>
    </VStack>
  );
};

export default Index;
