from ast import While
from turtle import onclick
from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

class WhatsappBot:
    def __init__(seLf):
        seLf.mensagens = ["MENSAGEM QUE DESEJA ENVIAR"]
        seLf.grupos = "QUAL GRUPO OU NOME DA PESSOA"
        options = webdriver.ChromeOptions()
        options.add_argument('lang=pt-br')
        seLf.driver = webdriver.Chrome(executable_path=r'./chromedriver.exe')
        seLf.driver.get('https://web.whatsapp.com/')
        time.sleep(25)

    def EnviarMensagens(seLf):
        # <span dir="auto" title="Praia com os amigos" class="ggj6brxn gfz4du6o r7fjleex g0rxnol2 lhj4utae le5p0ye3 l7jjieqr i0jNr">Praia com os amigos</span>
        # <div tabindex="-1" class="p3_M1">
        # <span data-testid="send" data-icon="send" class="">

        for mensagem in seLf.mensagens:
            grupo = seLf.driver.find_element(By.XPATH, f"//span[@title='{seLf.grupos}']")
            grupo.click()
            chat_box = seLf.driver.find_element(By.CLASS_NAME, 'p3_M1')
            time.sleep(0.5)
            chat_box.send_keys(mensagem)
            #botao_enviar = seLf.driver.find_element_by_xpath("//span[@data-icon='send']")
            #botao_enviar.click()
            chat_box.send_keys(Keys.RETURN)
            time.sleep(1)

bot = WhatsappBot()
bot.EnviarMensagens()

i= 0
while (i<= 1000):
    bot.EnviarMensagens()
    i = i + 1