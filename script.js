let puanText = document.getElementById('puanText')
puan = 0

const kartTemplate = `
    <div class="kart-cerceve">
        <div class="kart-onyuz">
            <img src="https://via.placeholder.com/100x100?text=?">
        </div>

        <div class="kart-arkayuz">
            <img src="">
        </div>
    </div>
`

let fotoNumaralari = []
//random fotoğraf nosu ayarlayan fonksiyon
let randomNum = function () {
  let randomArray = []
  for (let i = 0; i < 8; i++) {
    let randomNumbers = Math.floor(Math.random() * 99)
    randomArray.push(randomNumbers, randomNumbers)
    if (randomArray.length > 6) break
    shuffle(randomArray)
    fotoNumaralari = randomArray
  }

  return fotoNumaralari
}

//Arrayi karıştır
function shuffle(array) {
  let currentIndex = array.length, randomIndex
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array
}

console.log(randomNum())
//Görev2: Bu numaraları 1-99 arası(1 ve 99 dahil) sayılardan rastgele 4 çift oluşturacak şekilde üreten bir fonksiyon yazarak, kod bloğundaki array değerini bu fonksiyondan dönen array ile değiştiren kodları yazın => satır 20de oluşturulan arrayi foto numaralarına atıyoruz
console.log(fotoNumaralari)

for (fotoNumara of fotoNumaralari) {
  const yeniKart = document.createElement('div')
  yeniKart.innerHTML = kartTemplate
  yeniKart.classList.add('kart')
  yeniKart.querySelector(
    '.kart-arkayuz img'
  ).src = `https://lipsum.app/id/${fotoNumara}/100x100`
  document.querySelector('div#oyun-cerceve').append(yeniKart)

  //her bir karta tıklandığında "kartTiklama" fonksiyonu çalışacaktır.
  yeniKart.addEventListener('click', kartTiklama)
}

function kartTiklama(olay) {
  //Tıklanan kartı seçilen olarak değişkene atayalım
  const secilenKart = olay.currentTarget

  //Tıklanan kart eslesti classına sahipse daha önce başka kartla eşleşmiş ve zaten açık durumda demektir.İşlem yapmayacağız
  if (secilenKart.classList.contains('eslesti') === true) return

  //Tıklanan ve acılan karta tekrar tıklanırsa işlem yapmayacağız.
  if (secilenKart.classList.contains('acik') === true) return

  //Peşpeşe kartlara tıklandığında 2'den fazla kart tıklanmasını engellememiz gerekiyor.
  const tumAcikKartlar = document.querySelectorAll('.acik')
  if (tumAcikKartlar.length === 2) return

  //Açık olan kart varsa seçelim
  const acikKart = document.querySelector('.acik')

  //Hiç açık kart yoksa tıklanan karta açık class veriyoruz ve fonksiyondan çıkıyoruz.
  if (acikKart === null) {
    secilenKart.classList.add('acik')

    setTimeout(() => {
      secilenKart.classList.remove('acik')
    }, 1500)
    return
  }
  //Daha önce bir açık kartımız varmış, son seçilen karta da açık class vererek tersini çevirelim.
  secilenKart.classList.add('acik')

  //Açık kartlara ait img etiketlerinin srcleri birbiri ile eşleşiyor mu?
  const acikKartImg = acikKart.querySelector('.kart-arkayuz img')
  const secilenKartImg = secilenKart.querySelector('.kart-arkayuz img')
  if (acikKartImg.src === secilenKartImg.src) {
    //iki kart arasında eşleşme var
    acikKart.classList.add('eslesti')
    secilenKart.classList.add('eslesti')

    puan++

    console.log(puan)

    puanText.innerHTML = puan

    //Görev1: Kullanıcı 4 kartı da eşleştirdiğinde sayfa ortasında beliren hareketli gif dosyası formatında bir kutlama görseli belirsin ve bu fotoğraf 5 saniye sonra ortadan kaybolsun.

    acikKart.classList.remove('acik')
    secilenKart.classList.remove('acik')

    setTimeout(() => {
      acikKart.removeEventListener('click', kartTiklama)
      secilenKart.removeEventListener('click', kartTiklama)
    }, 1000)
  } else {
    //iki fotoğrafın srcsi birbirine eşit değil ise kartlar kapansın
    setTimeout(() => {
      acikKart.classList.remove('acik')
      secilenKart.classList.remove('acik')
    }, 1500)
  }

  if (puan === 4){
    const body = document.querySelector('body')
    setTimeout(()=>{
        body.innerHTML =""
        const finish = document.createElement('div') 
        finish.innerHTML = `
            <div style ="width:100vh;height:50vh;border:1px solid red;position:absolute;right:50vh;"><img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHYzcWoxZHdyNG9zZGNxbWs4ZTRhejk4MGxndzYzbGpnZmppNDZ2OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Je8kAWvC2ngLf2w/giphy.gif" style="width:100%;height:100%"></div>
        `
        body.append(finish)
    },500)
    
  }


}

