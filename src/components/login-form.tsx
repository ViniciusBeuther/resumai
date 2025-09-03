import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState<string>( "" );
  const [password, setPassword] = useState<string>( "" );
  const navigate = useNavigate();
  const LOGIN_ENDPOINT = "http://localhost:3001/api/auth/login";
  
const handleLogIn = async ( ev: any ) => {
  ev.preventDefault();

  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Login bem-sucedido!', data);
    
    // save token and user id logged in
    localStorage.setItem( "token", data.token );
    localStorage.setItem( "user_id", data.user_id );
    navigate( "/" );    

  } catch (error) {
    console.error('Houve um problema com a requisição de login:', error);
    alert("Error fazendo login, credenciais incorretas.")
  }
};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={ ( ev: ChangeEvent<HTMLInputElement> ) => setEmail( ev.target.value ) }
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  onChange={ ( ev: ChangeEvent<HTMLInputElement> ) => setPassword( ev.target.value ) } />
              </div>
              <div className="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full"
                  onClick={ ( ev ) => handleLogIn( ev ) }
                  >
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
