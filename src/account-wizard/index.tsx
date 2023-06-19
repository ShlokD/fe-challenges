import { FC, useState } from "react";

import HomeLink from "../home-link";
import { Newsletter, User, createUser } from "./sdk";

enum SignupStates {
  INIT,
  NEWSLETTER,
  LOADING,
  DONE,
}

type NameEmailFormProps = {
  handleSubmit?: ({ name, email }: { name: string; email: string }) => void;
};

type AgeNewsletterFormProps = {
  handleSubmit?: ({
    age,
    newsletter,
  }: {
    age: number;
    newsletter: "daily" | "weekly" | "monthly";
  }) => void;
};

type WelcomeProps = {
  name?: string;
  newsletter?: Newsletter;
};

const headlines: Record<SignupStates, string> = {
  [SignupStates.INIT]: "Please enter your details",
  [SignupStates.NEWSLETTER]: "Select Newsletter Options",
  [SignupStates.LOADING]: "Loading...",
  [SignupStates.DONE]: "Welcome",
};

const stateMachine: Record<SignupStates, SignupStates> = {
  [SignupStates.INIT]: SignupStates.NEWSLETTER,
  [SignupStates.NEWSLETTER]: SignupStates.LOADING,
  [SignupStates.LOADING]: SignupStates.DONE,
  [SignupStates.DONE]: SignupStates.DONE,
};

const NameEmailForm: FC<NameEmailFormProps> = ({ handleSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleFormSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    handleSubmit?.({ name, email });
    return false;
  };

  return (
    <form
      action="#"
      className="flex flex-col w-full items-center justify-center gap-4"
      onSubmit={handleFormSubmit}
    >
      <input
        id="name"
        aria-label="Enter your name"
        placeholder="Enter your name"
        className="p-4 border-2 w-10/12"
        value={name}
        autoComplete="off"
        required
        onChange={(ev) => setName((ev?.target as HTMLInputElement)?.value)}
      />

      <input
        id="email"
        type="email"
        aria-label="Enter your email"
        placeholder="Enter your email"
        className="p-4 border-2 w-10/12"
        value={email}
        autoComplete="off"
        required
        onChange={(ev) => setEmail((ev?.target as HTMLInputElement)?.value)}
      />

      <button
        onSubmit={handleFormSubmit}
        type="submit"
        className="p-4 bg-green-500 rounded-lg text-white font-bold"
      >
        Next
      </button>
    </form>
  );
};

const AgeNewsletterForm: FC<AgeNewsletterFormProps> = ({ handleSubmit }) => {
  const [age, setAge] = useState<string>("");
  const [newsletter, setNewsletter] = useState<Newsletter>("daily");
  const handleFormSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    handleSubmit?.({ age: parseInt(age), newsletter });
    return false;
  };
  return (
    <form
      action="#"
      className="flex flex-col w-full items-center justify-center gap-4"
      onSubmit={handleFormSubmit}
    >
      <input
        id="age"
        aria-label="Enter your age"
        placeholder="Enter your age"
        type="number"
        className="p-4 border-2 w-10/12"
        value={age}
        autoComplete="off"
        required
        min="18"
        max="100"
        onChange={(ev) => setAge((ev?.target as HTMLInputElement)?.value)}
      />

      <p className="text-center font-bold text-2xl">Select Newsletter</p>
      <div className="flex flex-row w-full px-4 w-10/12 gap-2 text-xl">
        <input
          id="daily"
          value="daily"
          type="radio"
          name="newsletter"
          checked={newsletter === "daily"}
          onChange={(ev) =>
            setNewsletter((ev?.target as HTMLInputElement)?.value as Newsletter)
          }
        />
        <label htmlFor="daily">Daily</label>
      </div>

      <div className="flex flex-row w-full px-4 w-10/12 gap-2 text-xl">
        <input
          id="weekly"
          value="weekly"
          type="radio"
          name="newsletter"
          checked={newsletter === "weekly"}
          onChange={(ev) =>
            setNewsletter((ev?.target as HTMLInputElement)?.value as Newsletter)
          }
        />
        <label htmlFor="weekly">Weekly</label>
      </div>

      <div className="flex flex-row w-full px-4 w-10/12 gap-2 text-xl">
        <input
          id="monthly"
          type="radio"
          value="monthly"
          name="newsletter"
          checked={newsletter === "monthly"}
          onChange={(ev) =>
            setNewsletter((ev?.target as HTMLInputElement)?.value as Newsletter)
          }
        />
        <label htmlFor="monthly">Monthly</label>
      </div>
      <button
        type="submit"
        className="p-4 bg-green-500 rounded-lg text-white font-bold"
      >
        Submit
      </button>
    </form>
  );
};

const Welcome: FC<WelcomeProps> = ({ name, newsletter }) => {
  return (
    <>
      <p className="text-2xl p-2">Hello {name}</p>
      <p className="text-lg p-2 text-center">
        You've signed up for a {newsletter} newsletter
      </p>
    </>
  );
};

const ComponentMap: Record<SignupStates, FC> = {
  [SignupStates.INIT]: NameEmailForm,
  [SignupStates.NEWSLETTER]: AgeNewsletterForm,
  [SignupStates.LOADING]: () => null,
  [SignupStates.DONE]: Welcome,
};

const AccountWizard = () => {
  const [signupState, setSignupState] = useState<SignupStates>(
    SignupStates.INIT,
  );
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    age: 0,
    newsletter: "daily",
  });

  const handleNext = () => {
    setSignupState((prev) => stateMachine[prev]);
  };

  const handleNameEmailSubmit = ({
    name,
    email,
  }: {
    name: string;
    email: string;
  }) => {
    setUser((prev) => ({
      ...prev,
      name,
      email,
    }));
    handleNext();
  };

  const handleAgeNewsletterSubmit = async ({
    age,
    newsletter,
  }: {
    age: number;
    newsletter: Newsletter;
  }) => {
    handleNext();
    const newUser = {
      ...user,
      age,
      newsletter,
    };
    setUser(newUser);
    const res = await createUser(newUser);
    if (res.token) {
      handleNext();
    }
  };

  const Comp: FC<object> = ComponentMap[signupState];

  const handleSubmit =
    signupState === SignupStates.INIT
      ? handleNameEmailSubmit
      : handleAgeNewsletterSubmit;

  const props =
    signupState === SignupStates.DONE
      ? { name: user.name, newsletter: user.newsletter }
      : { handleSubmit };
  return (
    <div className="flex flex-col w-full h-full ">
      <header className="bg-green-500 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl"> Account Wizard </h1>
      </header>
      <main className="flex flex-col w-full h-screen my-4 items-center p-4">
        <div className="border-2 rounded-lg w-full flex flex-col items-center py-6">
          <h2 className="p-2 text-2xl font-bold">{headlines[signupState]}</h2>
          <Comp {...props} />
        </div>
      </main>
    </div>
  );
};

export default AccountWizard;
