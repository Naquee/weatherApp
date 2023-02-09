import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
  Img,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import axios from "axios"

const Weather = () => {
    const[text,setText]=useState("mumbai")
    const [data,setData]=useState([])

    const getData =() => {
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=9685afa0a594e8e9635075c9d7c01b52`
        axios.get(url).then((res) => {
            // console.log("res", res)
            setData(res.data)

        })
        .catch((err) => {
            console.log("err",err)
        })
        setText("")
    }

    useEffect(() => {
        getData()
    },[])

    console.log("data",data)

  const handleSubmit = () => {
    // console.log(e.target.value)
    getData(text)
  };
  return (
    <Box width="50%" margin="auto">
      <Flex padding="20px">
        <Box width="100%">
          <Input
            placeholder="Search City"
            borderRight="none"
            borderRadius="none"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </Box>
        <Button
          borderRadius="none"
          border="1px solid #e3e9f0"
          borderLeft="none"
          fontSize="30px"
          background="transparent"
          onClick={handleSubmit}
        >
          <BsSearch />
        </Button>
      </Flex>


      {
        !data?(
            <Heading>No Data Found</Heading>
        ):(

            <Card>
        <CardHeader>
        <Heading>{data?.name} </Heading>
        <br />
          <Flex display="flex" justifyContent="space-around">
            <Box>
             
              <Heading size="md" fontSize="50px">{data?.main?.temp}°C</Heading>
            </Box>
            <Box fontSize="80px" color="#ffe634">
           
              <BsFillSunFill />
            </Box>
          </Flex>
        </CardHeader>

        <CardBody width="100%">
          <Stack divider={<StackDivider />} spacing="4">
            <Box width="100%" margin="auto">
              <Img
                width="100%"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaMyKRR9LRuljkmVtEILONLonykLyp26JFpg&usqp=CAU"
                alt="graph"
              />
            </Box>
            <Flex display="flex" justifyContent="space-around">
              <Box backgroundColor="#f5faff">
                <Text>Pressure</Text>
                <Text>{data?.wind?.speed} km/h</Text>
              </Box>
              <Box backgroundColor="#f5faff">
                <Text>Humidity</Text>
                <Text>{data?.main?.humidity}</Text>
              </Box>
            </Flex>

            <Flex display="flex" justifyContent="space-around">
              <Box backgroundColor="#f5faff">
                <Text>Sunrise</Text>
                <Text>7.10am</Text>
              </Box>
              <Box backgroundColor="#f5faff">
                <Text>Sunset</Text>
                <Text>6.00am</Text>
              </Box>
            </Flex>
            <Img src="https://www.suntoday.org/images/sunrise-sunset.png" alt="sunset" />
          </Stack>
        </CardBody>
      </Card>
        )
      }

     
    </Box>
  );
};

export default Weather;
