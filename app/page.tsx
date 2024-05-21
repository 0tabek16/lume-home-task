"use client";

import {
  Box,
  Card,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FixedSizeList } from "react-window";
import rawUsers from "../static/users.json";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const [tableHeight, setTableHeight] = useState(500);
  const [tableWidth, setTableWidth] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const users = useMemo(
    () =>
      rawUsers.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  useEffect(() => {
    if (containerRef.current && controlsRef.current) {
      setTableWidth(controlsRef.current.clientWidth);
      setTableHeight(
        containerRef.current.clientHeight - controlsRef.current.clientHeight - 5
      );
    }
  }, []);

  return (
    <Container maxW="container.lg" ref={containerRef} minHeight="100vh">
      <Box ref={controlsRef}>
        <Text fontSize="4xl">Customers List</Text>
        <Card padding={2}>
          <FormControl>
            <FormLabel>Search by name</FormLabel>
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FormControl>
        </Card>
        <SimpleGrid columns={4} spacing={10}>
          <GridItem>Name</GridItem>
          <GridItem>Email</GridItem>
          <GridItem>Phone number</GridItem>
          <GridItem>Gender</GridItem>
        </SimpleGrid>
      </Box>
      <FixedSizeList
        key={users.length}
        height={tableHeight}
        itemCount={users.length}
        itemSize={60}
        width={tableWidth}
      >
        {({ index, style }) => {
          const user = users[index];
          return (
            <Box style={style}>
              <Grid
                gridTemplateColumns={"1fr 2fr 1fr 1fr"}
                backgroundColor="white"
                rounded="md"
                padding="12px 18px"
                marginBottom={2}
              >
                <GridItem>{user.name}</GridItem>
                <GridItem>{user.email}</GridItem>
                <GridItem>{user.phone}</GridItem>
                <GridItem>
                  <Tag
                    borderRadius="full"
                    variant="subtle"
                    colorScheme={user.gender === "male" ? "blue" : "yellow"}
                  >
                    <TagLabel>{user.gender}</TagLabel>
                  </Tag>
                </GridItem>
              </Grid>
            </Box>
          );
        }}
      </FixedSizeList>
    </Container>
  );
}
