import { Button,  Input, VStack } from "@chakra-ui/react";
import { Field } from "./components/ui/field";
import axios from "axios";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { NumberInputField, NumberInputRoot } from "./components/ui/number-input";
import { useNavigate } from "react-router-dom";

const AddCake = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const onSubmit = (data: FieldValues) =>  {
    const parsedData = {
      ...data,
      yumFactor: Number(data.yumFactor)
    }
    axios.post('http://localhost:5050/cakes', parsedData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack alignItems={'center'}>
        <Controller
            control={control}
            name="name"
            render={({ field }) => (
                <Field label='Name' required width='50%'>
                  <Input type='text' placeholder='Enter a name' {...field} />
                </Field>
              )
            }
          />
          <Controller
            control={control}
            name="comment"
            render={({ field }) => (
                <Field label='Comment' required width='50%'>
                  <Input type='text' placeholder='Enter a comment' {...field} />
                </Field>
              )
            }
          />
          <Controller
            control={control}
            name="yumFactor"
            render={({ field }) => (
                <NumberInputRoot
                  width='50%'
                  min={1}
                  max={5}
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => {
                    field.onChange(value)
                  }}
                  required
                >
                  <NumberInputField />
                </NumberInputRoot>
              )
            }
          />
          <Controller
            control={control}
            name="imageUrl"
            render={({ field }) => (
                <Field label='Image url' width='50%' required>
                  <Input type='text' placeholder='Enter an imageUrl' {...field} />
                </Field>
              )
            }
          />
        <Button type="submit" size={'lg'} mt='3'>Submit</Button>
      </VStack>
    </form>
  )
};

export default AddCake;
