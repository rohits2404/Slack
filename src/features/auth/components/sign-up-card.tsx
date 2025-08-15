import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { SignInFlow } from "../types"
import { useState } from "react"
import { TriangleAlert } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react"

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");
    const [pending,setPending] = useState(false);
    const [error,setError] = useState("");

    const { signIn } = useAuthActions();
    
    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Passwords Do Not Match!")
            return;
        }
        setPending(true);
        signIn("password",{ email, password, flow: "signUp" }).catch(() => {
            setError("Something Went Wrong!")
        }).finally(() => {
            setPending(false);
        })
    }

    const onProviderSignUp = (value: "github" | "google") => {
        setPending(true);
        signIn(value).finally(() => {
            setPending(false);
        });
    }

    return(
        <Card className="w-full h-full p-8">
            <CardHeader>
                <CardTitle>
                    Register to Continue
                </CardTitle>
                <CardDescription>
                    Use Your Email or Another Service to Continue
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlert className="size-4"/>
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordSignUp} className="space-y-2.5">
                    <Input
                    disabled={pending}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                    />
                    <Input
                    disabled={pending}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    required
                    />
                    <Input
                    disabled={pending}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    type="password"
                    required
                    />
                    <Button type="submit" className="w-full" size={"lg"} disabled={pending}>
                        Register
                    </Button>
                </form>
                <Separator/>
                <div className="flex flex-col gap-y-2.5">
                    <Button
                    disabled={pending}
                    onClick={() => onProviderSignUp("google")}
                    variant={"outline"}
                    size={"lg"}
                    className="w-full relative"
                    >
                        <FcGoogle className="size-5 absolute top-3 left-2.5"/>
                        Continue With Google
                    </Button>
                    <Button
                    disabled={pending}
                    onClick={() => onProviderSignUp("github")}
                    variant={"outline"}
                    size={"lg"}
                    className="w-full relative"
                    >
                        <FaGithub className="size-5 absolute top-3 left-2.5"/>
                        Continue With Github
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Already Have An Account ? <span onClick={() => setState("signIn")} className="text-sky-700 hover:underline cursor-pointer">Sign In</span>
                </p>
            </CardContent>
        </Card>
    )
}