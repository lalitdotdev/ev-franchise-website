import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Row } from "@tanstack/react-table";
import { FranchiseType } from "@/types/frnachiseData";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { API_VERSION, BASE_URL } from "@/utils/APIRoutes";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import { Icons } from "@/app/login/page";

interface formProps {
  row: Row<FranchiseType>;
}

const InvestmentRange = z.enum([
  "1 Lakh – 15 Lakh",
  "15 Lakh – 30 Lakh",
  "Above 30 Lakh",
]);

const OnboardingAs = z.enum(["Franchise Distributor", "Charging Station"]); // Example values

const BookingForm = ({ row }: formProps) => {
  const formSchema = z.object({
    name: z.string(),
    email: z.string().email(), // Validate string as an email address
    phone: z.string(),
    city: z.string(),
    state: z.string(),
    franchiseName: z.string(),
    investmentRange: InvestmentRange.optional(),
    onBoardingAs: OnboardingAs.optional(),
    message: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      franchiseName: row.getValue("franchiseName"),
      investmentRange: undefined,
      onBoardingAs: undefined,
      message: "",
    },
  });

  const [position, setPosition] = React.useState<string | undefined>(undefined);
  const [investmentRange, setInvestmentRange] = React.useState<
    string | undefined
  >(undefined);

  const { signIn } = useAuth();

  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(position);
    console.log(investmentRange);

    if (!investmentRange && !position) return;

    setIsLoading(true);

    await axios
      .post(`${BASE_URL}${API_VERSION}/auth/signup`, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        city: values.city,
        state: values.state,
        franchiseName: values.franchiseName,
        investmentRange: investmentRange,
        onBoardingAs: position,
        message: values.message,
      })
      .then(({ data }) => {
        console.log(data);
        let user = data.user;
        user.token = data.token;
        setIsLoading(false);
        signIn(user);
        router.push("/booked");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  return (
    <Form {...form}>
      <div className="flex justify-start overflow-y-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-minor text-white">
              Book {row.getValue("franchiseName")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] h-[90vh] md:h-[80vh] md:w-[60vw] lg:w-[60vw] lg:max-w-[60vw] bg-white overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book {row.getValue("franchiseName")}</DialogTitle>
              <DialogDescription>
                Fill in the details and our team will reach out to you shortly!
              </DialogDescription>
            </DialogHeader>
            <form
              className="flex flex-col gap-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-6 sm:flex sm:flex-col md:grid md:grid-cols-2 md:gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="investmentRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-[9px]">
                      <FormLabel>Investment Range</FormLabel>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                              {investmentRange
                                ? investmentRange
                                : "Select Investment Range"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full bg-white">
                            <DropdownMenuRadioGroup
                              value={investmentRange}
                              onValueChange={setInvestmentRange}
                            >
                              <DropdownMenuRadioItem value="1 Lakh – 15 Lakh">
                                1 Lakh – 15 Lakh
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="15 Lakh – 30 Lakh">
                                15 Lakh – 30 Lakh
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="Above 30 Lakh">
                                Above 30 Lakh
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="onBoardingAs"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-[9px]">
                      <FormLabel>Onboarding As</FormLabel>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                              {position ? position : "Select Onboarding As"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full bg-white">
                            <DropdownMenuRadioGroup
                              value={position}
                              onValueChange={setPosition}
                            >
                              <DropdownMenuRadioItem value="Franchise Distributor">
                                Franchise Distributor
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="Charging Station">
                                Charging Station
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Any message for us"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex items-center justify-center mt-5">
                <Button type="submit" className="bg-black text-white w-fit">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Book Franchise
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Form>
  );
};

export default BookingForm;