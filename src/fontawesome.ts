// src/fontawesome.ts
import { library } from "@fortawesome/fontawesome-svg-core"
import { faTrophy, faUser, faCoffee } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

// Adiciona os ícones na biblioteca global
library.add(faTrophy, faUser, faCoffee, faHeart, faGithub)
