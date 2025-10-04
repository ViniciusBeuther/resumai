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
  const LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT;;
  
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
          <CardTitle>Entre em sua conta</CardTitle>
          <CardDescription>
            Digite seu email abaixo para fazer login
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
                  placeholder="email@exemplo.com"
                  required
                  onChange={ ( ev: ChangeEvent<HTMLInputElement> ) => setEmail( ev.target.value ) }
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
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
                  className="w-full hover:cursor-pointer"
                  onClick={ ( ev ) => handleLogIn( ev ) }
                  >
                  Entrar
                </Button>
                <Button variant="outline" className="w-full">
                  Login com Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Nao tem uma conta?{" "}
              <a href="#" className="underline underline-offset-4">
                Registrar-se
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
