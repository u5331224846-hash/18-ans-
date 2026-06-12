
const screens = {
  preStart: document.getElementById('preStartScreen'), start: document.getElementById('startScreen'), compat: document.getElementById('compatScreen'), chat: document.getElementById('chatScreen'), letter: document.getElementById('letterScreen'), home: document.getElementById('homeScreen'), photos: document.getElementById('photosScreen'), photoDetail: document.getElementById('photoDetailScreen'), history: document.getElementById('historyScreen'), birthday: document.getElementById('birthdayScreen')
};
const audio = {
  intro: document.getElementById('audioIntro'), scan: document.getElementById('audioScan'), chat: document.getElementById('audioChat'), letter: document.getElementById('audioLetter'), grand: document.getElementById('audioGrandCedre'), bouncer: document.getElementById('audioBouncer'), clubIntro: document.getElementById('audioClubIntro'),
  sectionPhotos: document.getElementById('audioSectionPhotos'), sectionLetter: document.getElementById('audioSectionLetter'), sectionHistory: document.getElementById('audioSectionHistory'),
  audioStoryOct1: document.getElementById('audioStoryOct1'), audioStoryOct2: document.getElementById('audioStoryOct2'), audioStoryNov1: document.getElementById('audioStoryNov1'), audioStoryNov2: document.getElementById('audioStoryNov2'), audioStoryDec1: document.getElementById('audioStoryDec1'), audioStoryDec2: document.getElementById('audioStoryDec2'), audioStoryJan1: document.getElementById('audioStoryJan1'), audioStoryJan2: document.getElementById('audioStoryJan2'), audioStoryFeb1: document.getElementById('audioStoryFeb1'), audioStoryFeb2: document.getElementById('audioStoryFeb2'), audioStoryMar1: document.getElementById('audioStoryMar1'), audioStoryMar2: document.getElementById('audioStoryMar2'), audioStoryApr1: document.getElementById('audioStoryApr1'), audioStoryApr2: document.getElementById('audioStoryApr2'), audioStoryMay1: document.getElementById('audioStoryMay1'), audioStoryMay2: document.getElementById('audioStoryMay2'), audioStoryJun1: document.getElementById('audioStoryJun1'), audioStoryJun2: document.getElementById('audioStoryJun2'),
  partyBg: document.getElementById('audioPartyBg'), jarvisLegal: document.getElementById('audioJarvisLegal'), jarvisPhotos: document.getElementById('audioJarvisPhotos'), jarvisBodycount: document.getElementById('audioJarvisBodycount'), jarvisSpotify: document.getElementById('audioJarvisSpotify')
};
const els = {
  lock: document.getElementById('audioLock'), jarvisLock: document.getElementById('jarvisLock'), startBtn: document.getElementById('startBtn'), searchBtn: document.getElementById('searchBtn'), statusText: document.getElementById('statusText'), profileCard: document.getElementById('profileCard'), avatarBox: document.getElementById('avatarBox'), avatarImg: document.getElementById('avatarImg'), avatarInitials: document.getElementById('avatarInitials'), profileName: document.getElementById('profileName'), profileResult: document.getElementById('profileResult'), barFill: document.getElementById('barFill'), checks: document.getElementById('checks'), profileBtn: document.getElementById('profileBtn'), envelopeBtn: document.getElementById('envelopeBtn'), homeBtn: document.getElementById('homeBtn'), restartBtn: document.getElementById('restartBtn'),
  openLetterBtn: document.getElementById('openLetterBtn'), openPhotosBtn: document.getElementById('openPhotosBtn'), openHistoryBtn: document.getElementById('openHistoryBtn'), open18Btn: document.getElementById('open18Btn'), photoGrid: document.getElementById('photoGrid'), backPhotosBtn: document.getElementById('backPhotosBtn'), detailImg: document.getElementById('detailImg'), detailCounter: document.getElementById('detailCounter'), detailTitle: document.getElementById('detailTitle'), detailDesc: document.getElementById('detailDesc'), letterBox: document.getElementById('letterBox'),
  playMonthBtn: document.getElementById('playMonthBtn'), helperBubble: document.getElementById('helperBubble'), storyMonth: document.getElementById('storyMonth'), storyTitle: document.getElementById('storyTitle'), storyText: document.getElementById('storyText'), prevPageBtn: document.getElementById('prevPageBtn'), nextPageBtn: document.getElementById('nextPageBtn'), pageIndicator: document.getElementById('pageIndicator'), skipBackBtn: document.getElementById('skipBackBtn'), skipNextBtn: document.getElementById('skipNextBtn'), acceptIntroBtn: document.getElementById('acceptIntroBtn'), preIntroScroll: document.getElementById('preIntroScroll'), catReward: document.getElementById('catReward'), closeCatReward: document.getElementById('closeCatReward')
};
const historyHomeBtn = document.querySelector('#historyScreen .backHomeBtn');
let locked = false;
let currentStory = 0;
let activeSequence = null;
let currentStoryAudio = null;
const sectionPlayed = { photos:false, letter:false, history:false };
const visitedTabs = { letter:false, photos:false, history:false };
function markVisited(tab){ visitedTabs[tab] = true; update18Button(); }
function update18Button(){
  const ready = visitedTabs.letter && visitedTabs.photos && visitedTabs.history;
  if(!els.open18Btn) return;
  els.open18Btn.disabled = !ready;
  els.open18Btn.classList.toggle('locked-18', !ready);
  els.open18Btn.setAttribute('aria-disabled', String(!ready));
  const txt = els.open18Btn.querySelector('p');
  if(txt) txt.textContent = ready ? 'Le meilleur pour la fin.' : 'Débloqué après la lettre, les photos et l’histoire.';
}
const letterParagraphs = ["Ma Anna,", "Aujourd’hui, tu vas avoir 18 ans, et moi, je me rends compte de la chance immense que j’ai de pouvoir être à tes côtés pour ce moment si important de ta vie.", "Ça va bientôt faire sept mois que tu es entrée dans mon cœur, mais j’ai l’impression que mon amour pour toi existe depuis bien plus longtemps. Comme si, quelque part, une partie de moi t’attendait déjà avant même de te connaître.", "Anna, je veux que tu saches une chose : je t’aime de tout mon cœur. Pas juste avec des mots, pas juste quand tout va bien, pas juste dans les moments simples. Je t’aime dans les détails, dans ton sourire, dans ta voix, dans ta manière d’être, dans tout ce qui fait que tu es toi.", "Depuis que tu es là, tu as rendu ma vie plus belle. Tu m’as appris ce que ça voulait dire de tenir vraiment à quelqu’un, de vouloir son bonheur avant même le sien, de sourire juste parce que l’autre existe. Avec toi, même les jours ordinaires deviennent précieux.", "Je ne suis peut-être pas parfait, et je ne le serai jamais totalement. Mais une chose est sûre : mon amour pour toi est sincère. Je veux prendre soin de toi, te respecter, te soutenir, te faire rire, te rassurer quand ça ne va pas, et te rappeler chaque jour à quel point tu comptes pour moi.", "Sept mois, ce n’est peut-être qu’un début, mais pour moi, c’est déjà une partie magnifique de mon histoire. Une histoire où ton prénom, Anna, a pris une place que personne d’autre ne pourra remplacer.", "Pour tes 18 ans, je ne veux pas seulement te souhaiter un joyeux anniversaire. Je veux te dire merci. Merci d’être toi. Merci d’être dans ma vie. Merci de me faire ressentir un amour aussi fort, aussi pur, aussi vrai.", "Je t’aime, Anna. Et si je devais choisir encore une fois, parmi tout le monde, dans toutes les vies possibles, je te choisirais toi. Toujours toi.", "Joyeux anniversaire mon cœur.", "Eliott"];
const storyPages = [
  {
    "month": "Octobre",
    "title": "Octobre, là où tout a commencé.",
    "text": "Tout a commencé au foyer. Je me rappellerai toujours de la toute première fois où on s'est adressé la parole : une éduc me faisait visiter les lieux et quand on est arrivés dans la cuisine, elle m’a proposé des bonbons. J'ai répondu « non » tout court, un peu dans ma bulle. Mais en vrai, notre rencontre c'était bien plus brutal que ça avec toute l'histoire autour de Pauline... On pourrait en faire un livre tellement c'était le bordel, mais avec le recul, qu'est-ce que c’était marrant !\n\nPendant les deux ou trois premiers jours, on ne s'est pas reparlé. Moi, je te voyais passer, je te surveillais du coin de l’œil en restant discret, mais je savais déjà que tu étais la plus belle. Puis Lucie t’a donné mon numéro, et là, on a enfin commencé à se parler pour de vrai. Je n'oublierai jamais ces matins où je me forçais à me lever à 9h, juste parce que je savais que toi tu étais déjà debout. On se retrouvait tous les deux dans la salle d’activité. À ce moment-là, je savais que t’avais encore ton ex en tête, Hyton, et que je n'étais pas forcément la priorité dans ta vie. Mais on a continué à se rapprocher, à passer des heures sur le canapé gris ou dans ta chambre à se faire des câlins.\n\nEt puis, il y a eu ce soir-là. Notre premier bisou. On était sur le canapé gris, c'était le moment parfait... à part Ismael qui tapait comme un malade sur la vitre juste à côté pour nous casser notre délire ! Mais c'est pas grave, parce que depuis ce bisou, on ne s'est plus jamais lâchés.",
    "audioKey": "audioStoryOct1"
  },
  {
    "month": "Octobre",
    "title": "Entre planques et forêt.",
    "text": "Le foyer, c’était aussi nos premières galères de rebelles. Comme le soir où je me suis caché dans ta chambre pour dormir avec toi. Les éducs ont retourné tout le bâtiment pour me trouver ! Ils ont fini par me cramer et j’ai essayé de négocier avec Ali pour rester, mais il n'a rien voulu savoir. On rigolait avec notre fameuse règle de la « porte ouverte », et Ali qui manquait de nous griller toutes les deux minutes.\n\nLa fin du mois a été plus tendue. Il y a eu des événements qui ont tout remis en question, on s’est disputés, on était en plein flirt mais c’était fragile. On est partis aux Sables-d'Olonne le 31 octobre pour Halloween, et c'était le bordel complet. On a dormi dans un parking souterrain, on a fini chez mon pote Noam...\n\nC’est finalement dans une forêt, après s'être bien engueulés pour mettre les choses à plat, qu’on a décidé d'arrêter les conneries. On s’est mis ensemble officiellement ce soir-là, en se jurant que plus rien ne viendrait nous séparer et qu'on ne se ferait plus jamais de mal. C’était le vrai départ de NOUS.",
    "audioKey": "audioStoryOct2"
  },
  {
    "month": "Novembre",
    "title": "Notre petite routine et les soirées chez Hugo.",
    "text": "Le début du mois de novembre a été beaucoup plus calme. On a commencé à installer notre petite routine à nous, et franchement, j'adorais ça. Nos câlins du matin, nos journées passées l’un collé à l’autre, et nos sorties le soir.\n\nPuisqu'on se dit tout dans ce carnet, il faut aussi qu'on parle de mes défauts. Je sais que pendant ces soirées-là, j'ai souvent été aigri, et je m'en excuse encore aujourd'hui. J'avais mes humeurs, mais il faut que tu saches que même quand je faisais la gueule, au fond, je profitais à fond d'être avec toi et j'étais heureux.\n\nComme il commençait à faire super froid dehors, on a fini par rentrer et on a fait nos premières soirées en intérieur, chez Hugo. C'étaient de sacrées soirées. Il y avait Yoann qui était à fond sur Louise et qui essayait de gérer son truc, pendant que nous deux on trinquait, on buvait et on faisait juste la fête. On était dans notre bulle, tout semblait tellement simple.",
    "audioKey": "audioStoryNov1"
  },
  {
    "month": "Novembre",
    "title": "L'épreuve, le pardon et le sapin de Noël.",
    "text": "Mais novembre n'a pas été facile jusqu'au bout. Il y a eu l'histoire avec Alexandre. Je ne vais pas te mentir, cette période m'a anéanti intérieurement. J'étais vraiment brisé. Je t'avais donné toute ma confiance, on n'était plus dans un simple flirt, on était un vrai couple en train de construire quelque chose de solide, et j'ai cru que tout s'effondrait. Ça m'a fait horriblement mal.\n\nMais la vérité, c'est que je ne pouvais pas te laisser partir. Je t'aimais déjà beaucoup trop. Ça a été dur de m'en remettre, mais j'ai fait le choix d'accepter ce qui est arrivé parce que je voulais qu'on avance ensemble. Je ne regretterai jamais ce choix.\n\nParce que grâce à ça, on a réussi à remonter la pente et on a fini le mois ensemble, plus soudés. On est allés au Marché de Noël avec Yoann. On est allés voir le spectacle de Noël illuminé sur la façade de la Mairie de Tours. Il faisait froid, l'ambiance de la ville était magique, et après tout ce qu'on avait traversé, on a clôturé ce mois avec ce magnifique bisou, juste devant le grand sapin.",
    "audioKey": "audioStoryNov2"
  },
  {
    "month": "Décembre",
    "title": "Décembre, entre guirlandes, Zootopie et petites tensions.",
    "text": "Décembre est arrivé et avec lui, toute l’ambiance des fêtes. Au foyer, c’était la course : il fallait préparer la fête, installer les décos, et on sentait que la fin d’année approchait à grands pas. On gardait nos petites habitudes, nos câlins et nos bisous qui nous faisaient du bien. C'est aussi ce mois-là qu'on a fait nos premières « sorties de couple » officielles. Il y a eu ce fameux ciné pour aller voir Zootopie 2. Un moment merveilleux, posés dans le noir, juste tous les deux. Et puis, il y a eu l'étape au-dessus : on a vu ma sœur, et on a même croisé tes parents. Je me souviens encore de ta tête, tu étais tellement gênée, c'était beaucoup trop drôle à voir !\n\nC’était quand même une période bizarre. Pour être honnête, on se faisait souvent la gueule pour tout et n'importe quoi. Pendant la fête de Noël du foyer, j'ai un peu tout niqué parce que j'étais dans mes humeurs (et j’avoue aujourd'hui que c’était totalement de ma faute). Mais malgré ça, j’étais tellement content de vivre ces préparatifs avec toi.\n\nPuis le vrai Noël est arrivé, avec nos premiers DVH. Pour la première fois, on a été séparés pendant longtemps. C’était dur, mais ça nous a prouvé que même loin, on tenait le coup.",
    "audioKey": "audioStoryDec1"
  },
  {
    "month": "Décembre",
    "title": "La gastro du Nouvel An et le premier bisou de l'année.",
    "text": "Pour clôturer l’année, le Nouvel An est arrivé. Mon meilleur pote Noham nous a rejoint, et ça aurait dû être une fête parfaite... si je n'avais pas chopé une gastro monumentale juste la veille ! Je n'oublierai jamais ce moment où tu as dû t'occuper de moi alors que je vomissais partout. Franchement, merci encore, parce que c’est là qu'on voit les vrais. Si tu es restée là malgré ça, c’est que c’était du sérieux.\n\nMalgré ma tête de déterré, on était ensemble pour le décompte de minuit. 3, 2, 1... On a échangé notre premier bisou de l'année au milieu du bruit et de la fête.\n\nÀ ce moment précis, j’ai eu un vrai déclic. J’ai regardé ton visage et j’ai compris que je ne voulais pas être ailleurs qu'avec toi. J’ai su qu’on n'était pas juste un petit couple de passage, mais qu’on allait tenir sur la durée. On finissait l'année en beauté, et j'avais hâte de voir la suite.",
    "audioKey": "audioStoryDec2"
  },
  {
    "month": "Janvier",
    "title": "Janvier, la neige et la peur de te perdre.",
    "text": "Le début de l’année a commencé avec toi qui étais malade. Après le Nouvel An, on est revenus doucement à la réalité, mais je me souviens surtout de cette période comme d’un moment compliqué pour nous deux.\n\nEn janvier, on a eu ce qui reste, à mes yeux, notre plus grosse dispute. C’était le moment où tout était allé trop loin. Tu avais voulu me quitter, et moi, j’étais complètement à bout. Je ne savais plus quoi dire, plus quoi faire, je savais juste une chose : je ne pouvais pas te perdre. À ce moment-là, tu étais déjà beaucoup trop précieuse pour moi.\n\nEt puis, le lendemain, la neige est tombée. Je m’en souviens encore comme si c’était hier. J’étais perdu, le cœur lourd, incapable de savoir comment réparer les choses. Et là, sous la neige, tu es venue vers moi pour me faire un câlin.\n\nCe câlin-là, il m’a réchauffé le cœur plus que n’importe quoi. Après toute la tension, après toute la peur, c’était comme si, d’un coup, je retrouvais un peu d’espoir. La neige tombait autour de nous, mais moi, à ce moment-là, j’avais juste l’impression que le plus important, c’était que tu sois encore là.",
    "audioKey": "audioStoryJan1"
  },
  {
    "month": "Janvier",
    "title": "Entre neige, fugue, Hubert Matelas et Laser Max.",
    "text": "Après ça, il a continué de neiger pendant plus d’une semaine. C’était un mois bizarre, mais aussi rempli de souvenirs. Moi, j’étais avec Ismael, à sécher les cours et à jouer dehors dans la neige, pendant que toi tu faisais tes sessions potins avec AD.\n\nEt puis il y a eu cette fameuse fugue chez AD, chez le gars qui habitait à Montconseil. À partir de ce moment-là, je crois que je n’ai pas arrêté de te parler de Hubert Matelas, l’application que j’avais créée parce que je me faisais chier.\n\nFranchement, j’avais vraiment une vie passionnante : en début de semaine, je n’étais pas là à cause de mes premiers longs DVH, et en fin de semaine, je squattais le radiateur du foyer comme si c’était mon endroit attitré.\n\nVers la fin du mois, on a fêté l’anniversaire d’Angélique avec une soirée incroyable. Bon, je n’ai pas fini dans le meilleur état, mais j’ai vraiment trop kiffé être là, et surtout, j’ai aimé que tu sois là avec moi. Je n’oublierai pas non plus ce moment où tu es venue me réconforter, et où tu m’as parlé de choses difficiles qui t’avaient marquée. Ça m’a énormément touché, parce que j’ai senti que tu me faisais confiance.\n\nEt le mois s’est terminé avec la partie de Laser Max du foyer. Elle était vraiment incroyable. Bon, normalement on est là pour parler de notre histoire, pas de moi… mais je tiens quand même à préciser que j’ai fini quatrième. Et ça, je ne l’oublierai jamais non plus.",
    "audioKey": "audioStoryJan2"
  },
  {
    "month": "Février",
    "title": "Février, entre distance, fugues et Saint-Valentin.",
    "text": "Le mois de février a commencé un peu comme les autres mois, avec notre petite routine à nous. Il y avait toujours ces fugues du vendredi, ces moments où on sortait, où on faisait nos bêtises, où on profitait juste d’être ensemble. Et franchement, je trouve qu’on s’amusait bien. On avait nos habitudes, nos délires, notre façon d’être tous les deux.\n\nMais en même temps, février a été un mois un peu particulier, parce qu’on était à la fois de plus en plus proches et de plus en plus loin. Toi, tu commençais à avoir tes DH une semaine sur deux, et moi, mes DVH augmentaient de plus en plus. Il arrivait même parfois qu’on ne se croise pas pendant plus d’une semaine. Et même si on faisait avec, je ne vais pas mentir : cette situation m’attristait un peu.\n\nMoi, pendant ce temps-là, je ne me suis pas ennuyé. C’est à partir de ce moment-là que j’ai commencé à faire mon court-métrage avec Morel. Ça m’occupait, ça me faisait penser à autre chose, mais malgré tout, il y avait toujours ce manque de toi. On arrivait rarement à se voir, et pourtant, j’avais l’impression qu’on se rapprochait encore plus. Comme si la distance rendait chaque moment ensemble encore plus important.\n\nHeureusement, tu as réussi à te libérer pour la Saint-Valentin et pour mon anniversaire. Et franchement, pour moi, cette journée reste encore aujourd’hui l’un des plus beaux moments de l’année. J’ai adoré cette journée du début à la fin. Les cadeaux qu’on s’est offerts, mon anniversaire qu’on a fêté, le fait d’être avec toi, tout ce qui s’est passé… c’était incroyable.\n\nCe jour-là, je me suis senti vraiment heureux. Pas juste parce que c’était mon anniversaire, mais parce que tu étais là. Parce qu’au milieu de toutes les semaines où on se voyait moins, de tous ces moments où on se manquait, on a quand même réussi à se retrouver pour vivre une journée magnifique. Et ça, je ne l’oublierai jamais.",
    "audioKey": "audioStoryFeb1"
  },
  {
    "month": "Février",
    "title": "Février, avancer malgré tout et ma première fois chez toi.",
    "text": "Après mon anniversaire, le mois de février a continué, et globalement, tout se passait un peu comme avant. Les éducs nous faisaient moins chier, on pouvait faire nos trucs plus tranquillement, et j’avais l’impression qu’on respirait un peu plus. On avait plus de liberté, plus de moments à nous, et ça faisait du bien.\n\nMais février, c’était aussi un mois avec des tensions. Je crois même que c’est l’un des mois où on s’est le plus disputés. Vers la fin du mois, il y a eu cette fameuse dispute quand on était sortis avec Éva. Je sais que c’est un gros moment dans notre couple, un moment qui a compté, mais je préfère ne pas trop m’y attarder ici. Pas parce que ça n’a pas existé, ni parce qu’il faut faire comme si de rien n’était, mais parce que je préfère qu’on continue d’avancer.\n\nOn a tous les deux eu des torts dans cette histoire. Je ne dis pas qu’il faut l’enterrer complètement, je dis juste que je préfère retenir qu’on est encore là aujourd’hui. Qu’on a réussi à dépasser ça, même si ce n’était pas simple. Parce que notre histoire, ce n’est pas seulement les disputes ou les moments compliqués. C’est aussi tout ce qu’on construit après, malgré les erreurs, malgré les blessures, malgré les moments où on ne sait plus trop comment faire.\n\nEt puis, la fin du mois s’est terminée avec un souvenir beaucoup plus doux : ma première fois chez toi. Pendant plus d’une semaine, j’étais en DVA, et ta mère a accepté que je vienne. Au début, je ne vais pas mentir, j’avais peur. Peur de ta mère, peur de ta sœur, peur de ne pas savoir comment me comporter, peur que ce soit bizarre.\n\nMais au final, ça s’est bien passé. C’était même très marrant. J’ai découvert un peu plus ton univers, ta maison, ta famille, ta façon d’être chez toi. Bon, tu étais beaucoup sur ta Switch, mais je ne t’en veux pas. Enfin… un peu quand même. Mais même avec ça, c’était incroyable.\n\nParce que pour moi, venir chez toi, ce n’était pas juste passer du temps dans une maison. C’était entrer un peu plus dans ta vie. Et ça, ça voulait dire beaucoup.",
    "audioKey": "audioStoryFeb2"
  },
  {
    "month": "Mars",
    "title": "Mars, la fin du foyer et les habitudes qui changent.",
    "text": "Le mois de mars, c’était un mois un peu comme les autres. D’ailleurs, je me suis trompé avant : j’avais dit que la première fois que j’étais venu chez toi, c’était à la fin du mois de février, mais en fait non. La fin février, il ne s’est rien passé de fou en particulier. C’est bien à la fin du mois de mars que je suis venu chez toi pour la première fois. Mais ça, on y revient après.\n\nMars, c’était surtout une période où on se voyait moins. Toi, tu avais de plus en plus de DVH, et moi, je commençais à être en embrouille avec Morel et Éva. Franchement, c’était une période un peu éclatée. Moi, j’étais comme un gros puant, dans ma chambre en bordel, posé devant mon rétroprojecteur, à faire ma vie comme je pouvais.\n\nOn se croisait surtout de temps en temps en fin de semaine. On continuait à faire des soirées comme d’habitude, mais ce n’était plus exactement pareil. Ça avait un goût différent, parce qu’on savait qu’à la fin du mois, on sortait du foyer. Du coup, il y avait un peu de nostalgie dans l’air, même si on ne le disait pas forcément comme ça.\n\nIl y a aussi eu le grand changement de chambre au dernier moment, quand toi et AD vous avez eu la chambre double. Ça a été un long moment de ménage pour ta chambre, vraiment un bon chantier, mais on a fini par réussir. Après ça, c’était un peu plus compliqué d’avoir de l’intimité, mais bon, on faisait avec.\n\nHeureusement, de mon côté, je me suis un peu repris en main. J’ai commencé à nettoyer toute ma chambre pour que ce soit enfin vivable. Ce n’était pas du luxe, parce qu’à ce moment-là, ma chambre avait vraiment besoin d’aide.",
    "audioKey": "audioStoryMar1"
  },
  {
    "month": "Mars",
    "title": "Mars, la première fois chez toi et la suite qui arrivait.",
    "text": "La fin du mois de mars, c’est surtout là que je suis venu chez toi pour la première fois. Après tout ce mois un peu bizarre, entre les changements au foyer, les gens qui nous manquaient et l’ambiance qui commençait à changer, ça faisait du bien de vivre un moment différent.\n\nJe me souviens que j’étais un peu stressé. Je ne savais pas trop comment ça allait se passer, parce que c’était la première fois que je venais vraiment dans ton monde à toi, chez ta mère. Mais au final, ça s’est bien passé, et ça reste un souvenir important pour moi.\n\nAprès ça, je suis rentré chez moi. Le mois de mars s’est terminé comme ça, avec l’impression qu’une période se finissait vraiment. Et au début du mois d’avril, on avait notre audience au tribunal, donc on savait déjà que la suite allait encore changer beaucoup de choses.",
    "audioKey": "audioStoryMar2"
  },
  {
    "month": "Avril",
    "title": "Avril, l'audience et le départ du foyer.",
    "text": "Le mois d’avril a commencé très rapidement. Dès le 4 avril, on avait notre audience, et on savait que ça allait sûrement tout changer. Comme il y avait de grandes chances qu’on sorte du foyer, il fallait commencer à ranger nos chambres, trier nos affaires, tout nettoyer, pour que le jour J tout soit prêt quand nos parents viendraient nous chercher.\n\nJ’ai terminé ma chambre en premier, donc après je suis venu t’aider à finir tes affaires. Franchement, c’était assez drôle. On a dû tout nettoyer, trier, ranger, faire les sacs, et ça faisait bizarre parce qu’on savait que ce n’était pas juste du ménage normal. C’était vraiment la fin d’une période.\n\nJe me souviens que ta mère est arrivée en premier. Elle était assez pressée et elle est venue tôt, donc on a à peine eu le temps de se dire au revoir. Ça m’a fait bizarre. Ma mère, elle, est venue beaucoup plus tard, donc j’ai eu plus de temps avant de partir.\n\nQuand j’ai quitté le foyer, ça m’a fait un petit pincement au cœur. Même si ce n’était pas toujours simple là-bas, c’était quand même l’endroit où on s’était rencontrés, où on avait vécu plein de choses, où notre histoire avait vraiment commencé. Mais en même temps, ça m’a fait du bien de rentrer chez moi.\n\nAvril, c’était le début d’une nouvelle période. On n’était plus au foyer, mais on était toujours nous deux. Et même si tout changeait autour de nous, je savais que je voulais continuer à être avec toi.",
    "audioKey": "audioStoryApr1"
  },
  {
    "month": "Avril",
    "title": "Avril, Family Park, chez toi, chez moi et la vraie vie.",
    "text": "Avril, c’était aussi une succession de plein de choses. C’est à partir de ce mois-là que j’ai commencé à chercher du taf, et toi aussi. On avait même essayé de postuler tous les deux à Family Park, sans succès. Bon, ça n’a pas marché, mais avec le recul, c’était quand même une période assez marrante.\n\nComme on venait de sortir du foyer, on avait trop envie d’aller chez l’un et chez l’autre. On n’avait pas envie de passer du temps séparés. On avait été habitués à se voir tout le temps, donc forcément, dès qu’on pouvait être ensemble, on voulait en profiter.\n\nJe suis venu une semaine chez toi, et franchement c’était trop bien. À part ta mère qui me faisait un peu peur parce qu’il fallait être productif. Je rigole évidemment, mais quand même, j’avais un peu la pression. Je me souviens surtout de nos parties de Monopoly où je te laminais. Ça aussi, je suis obligé de le préciser.\n\nAprès, tu es venue une semaine chez moi, quand j’étais revenu des Sables-d’Olonne avec Noam. Maintenant, je sais que ça ne s’est pas super bien passé chez moi, et j’espère quand même que tu as réussi à kiffer un minimum. Parce que moi, malgré tout, je garde de bons souvenirs de cette période.\n\nJe me souviens de la fête foraine, de la tête dans le Flasher, et franchement c’était incroyable. C’était un de ces moments un peu bêtes, un peu simples, mais qui restent dans la tête.\n\nAprès ça, tu as dû rentrer chez toi pour finir ton CNED et pouvoir te poser. Avril, c’était vraiment le mois où on a commencé à découvrir ce que ça faisait d’être ensemble en dehors du foyer. Ce n’était pas toujours parfait, mais c’était réel, et c’était notre histoire qui continuait autrement.",
    "audioKey": "audioStoryApr2"
  },
  {
    "month": "Mai",
    "title": "Mai, une semaine chez toi et le fameux 15 en techno.",
    "text": "Le mois de mai, il ne s’est pas passé énormément de choses en particulier. Mais je me souviens quand même d’une super semaine chez toi, parce que oui, j’étais retourné chez toi, et franchement c’était trop bien.\n\nJe me souviens aussi que je t’ai quand même fait avoir 15 à ton cours de techno, parce que j’ai quasiment tout fait. Eh eh. Non mais en vrai, j’ai adoré t’aider. J’aimais bien être là avec toi, t’aider sur tes cours, passer du temps chez toi, et juste profiter de cette semaine.\n\nC’était simple, mais c’était bien. On n’avait pas besoin de faire un truc incroyable tous les jours pour que ça compte. Être chez toi, être avec toi, rigoler, t’aider, me poser avec toi, ça suffisait largement.\n\nBon, c’est vrai que je t’ai fait la gueule pendant plus d’une journée. Je ne vais pas faire comme si de rien n’était. Mais promis, ça ne se reproduira pas. Enfin, je vais faire de mon mieux, parce que je sais que parfois je peux être chiant pour rien, mais je veux vraiment m’améliorer là-dessus.",
    "audioKey": "audioStoryMay1"
  },
  {
    "month": "Mai",
    "title": "Mai, les soirées, les moments posés et l’arrivée de juin.",
    "text": "Pour le reste du mois de mai, je n’ai pas grand-chose de plus à ajouter. Ce n’était pas un mois avec des énormes événements, mais ça fait quand même partie de notre histoire.\n\nOn a fait nos soirées, on s’est posés, on a continué à vivre notre relation tranquillement. Après tout ce qu’on avait déjà traversé, ça faisait du bien aussi d’avoir un mois un peu plus calme, sans gros truc incroyable à raconter.\n\nMai, c’était surtout ça : des moments simples, une semaine chez toi, des soirées, des petits souvenirs, et nous deux qui continuions à avancer.\n\nEt puis petit à petit, on est arrivés au mois de juin.",
    "audioKey": "audioStoryMay2"
  },
  {
    "month": "Juin",
    "title": "Juin, le début du mois et l’envie de la suite.",
    "text": "Le mois de juin vient à peine de commencer, mais franchement, j’ai déjà adoré le début. J’ai adoré cette semaine que tu as passée chez moi. Je trouve qu’on s’est bien amusés, qu’on a bien profité, et ça m’a fait trop plaisir de t’avoir avec moi.\n\nJe t’ai même fait découvrir un nouveau type de jeu, avec de nouvelles sensations sur Pony. Bref, encore un délire de plus à ajouter à notre liste. Et j’ai hâte qu’on refasse ça un jour, parce qu’avec toi, même les trucs simples peuvent devenir des vrais souvenirs.\n\nOn est seulement au début du mois de juin, mais je sens déjà qu’on va passer un mois de dingue. Et quand je repense à toute notre histoire, à tout ce qu’on a vécu depuis le début, je me dis qu’il y aura sûrement encore des complications. On ne va pas se mentir, avec nous, tout n’est jamais parfaitement simple.\n\nMais putain, qu’est-ce qu’on va s’amuser.\n\nPlus j’y pense, plus je me dis que le jour où on vivra ensemble, ça va être quelque chose. Il y aura sûrement des prises de tête, des moments où on va se saouler, des trucs pas parfaits, mais il y aura surtout nous deux, nos délires, nos habitudes, nos fous rires, nos moments posés, et tout ce qu’on va construire petit à petit.\n\nEt rien que d’imaginer ça, ça me donne encore plus envie de continuer cette histoire avec toi.",
    "audioKey": "audioStoryJun1"
  },
  {
    "month": "Grand final",
    "title": "Le grand final, ou plutôt le début de la suite.",
    "text": "Voilà, j’ai résumé notre histoire du début à aujourd’hui. Alors oui, il manque sûrement énormément de choses. Il y a sûrement des moments importants que j’ai oubliés, des détails, des discussions, des soirées, des disputes, des fous rires, des petits souvenirs qui mériteraient aussi d’être racontés.\n\nMais j’ai surtout voulu parler de l’essentiel. De ce qui m’a marqué moi. De ce qui, je pense, t’a marquée toi aussi. De tous ces moments qui ont fait avancer notre couple, même quand ce n’était pas simple. Parce qu’au final, tout ce qu’on a vécu, les bons moments comme les plus compliqués, ça nous a amenés jusqu’ici.\n\nEt aujourd’hui, on est encore là.\n\nAnna, je t’aime. Je t’aime vraiment, pas juste pour les moments faciles, pas juste quand tout va bien. Je t’aime pour ce que tu es, pour ce que tu m’apportes, pour la place que tu as prise dans ma vie. Je t’aime parce qu’avec toi, j’ai découvert une histoire qui ne ressemble à aucune autre.\n\nJe sais qu’on n’est pas parfaits. Je sais qu’on a nos défauts, nos caractères, nos moments où on se comprend mal. Mais je sais aussi que ce qu’on a est fort. Et moi, j’ai envie de continuer à avancer avec toi, de grandir avec toi, de vivre encore plein de choses avec toi.\n\nCette histoire, si on y regarde de plus près, elle ne fait que commencer.\n\nElle va continuer à s’agrandir au fur et à mesure, avec de nouvelles pages, de nouveaux souvenirs, de nouveaux moments à raconter. Et j’espère du fond du cœur que dans longtemps, on pourra relire tout ça en se disant qu’on avait raison d’y croire.\n\nJe t’aime, Anna.\n\nEt ce n’est que le début de nous.",
    "audioKey": "audioStoryJun2"
  }
];
const gallery = [
  {src:'assets/img/gallery/photo-1.jpeg', title:'Souvenir 1', desc:"La photo que t’aimes pas, mais moi c’est tellement un bon souvenir, elle est iconique."},
  {src:'assets/img/gallery/photo-2.jpeg', title:'Souvenir 2', desc:"Je savais pas que les cheveux prenaient un coup de soleil. Ah là là, si seulement tu m’avais écouté."},
  {src:'assets/img/gallery/photo-3.jpeg', title:'Souvenir 3', desc:"Je sais pas, j’ai trouvé cette photo, j’ai souri, je l’ai mise."},
  {src:'assets/img/gallery/photo-4.jpeg', title:'Souvenir 4', desc:"Une des plus belles photos à deux qui représente bien notre couple, et en plus en noir et blanc comme ça si t’es pas bronzée ça se verra pas."},
  {src:'assets/img/gallery/photo-5.jpeg', title:'Souvenir 5', desc:"Anna, photo prise en mars 2026 dans son état naturel, c’est très rare de nos jours."},
  {src:'assets/img/gallery/photo-6.jpeg', title:'Souvenir 6', desc:"Photo très récente, mais à la fois c’était mignon, mais insupportable."},
  {src:'assets/img/gallery/photo-7.jpeg', title:'Souvenir 7', desc:"Une des plus belles photos de notre couple avec celle des Sables d’Olonne, je l’aime trop. Mon petit bonhomme blanc et toi qui m’engueule, la vibe de cette photo est juste parfaite."},
  {src:'assets/img/gallery/photo-8.jpeg', title:'Souvenir 8', desc:"Le fond d’écran que t’as essayé de me faire, celui-là il va te suivre toute ta vie parce qu’il est incroyable."},
  {src:'assets/img/gallery/photo-9.jpeg', title:'Souvenir 9', desc:"Moi qui réchauffe mes fesses et toi qui réchauffe mon cœur. ❤️"},
  {src:'assets/img/gallery/photo-10.jpeg', title:'Souvenir 10', desc:"Hop là, on évite de regarder, c’est privé."},
  {src:'assets/img/gallery/photo-11.jpeg', title:'Souvenir 11', desc:"Fais pas genre t’es grande, je sors du bonhomme de neige, je te dépasse."},
  {src:'assets/img/gallery/photo-12.jpeg', title:'Souvenir 12', desc:"Bébé Anna qui dit bonjour au Père Noël."},
  {src:'assets/img/gallery/photo-13.jpeg', title:'Souvenir 13', desc:"Même si je passe deuxième dans le tableau des bisous, celui-là était incroyable."},
  {src:'assets/img/gallery/photo-14.jpeg', title:'Souvenir 14', desc:"Qui veut charger son téléphone ?"},
  {src:'assets/img/gallery/photo-15.jpeg', title:'Souvenir 15', desc:"Nos premiers câlins sur le canapé gris, il me réchauffe le cœur celui-là."},
  {src:'assets/img/gallery/photo-16.jpeg', title:'Souvenir 16', desc:"La première fois que tu me prenais dans tes bras."},
  {src:'assets/img/gallery/photo-17.jpeg', title:'Souvenir 17', desc:"T’aurais vu ta tronche."},
  {src:'assets/img/gallery/photo-18.jpeg', title:'Souvenir 18', desc:"Excuse-nous la star, moi qui profite à côté."},
  {src:'assets/img/gallery/photo-19.jpeg', title:'Souvenir 19', desc:"Ali pas content."},
  {src:'assets/img/gallery/photo-20.jpeg', title:'Souvenir 20', desc:"Putain enfin une photo normale."}
];

function renderLetter() { els.letterBox.innerHTML = letterParagraphs.map(p => `<p>${escapeHtml(p)}</p>`).join(''); }
function escapeHtml(str) { return String(str).replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }
function show(which) { Object.values(screens).forEach(s => s.classList.remove('active')); screens[which].classList.add('active'); }
function setLock(on) { locked = on; els.lock.classList.toggle('hidden', !on); }
function allAudios() { return Object.values(audio).filter(Boolean); }
function allStoryAudios() { return storyPages.map(p => audio[p.audioKey]).filter(Boolean); }
function stopAll() { allAudios().forEach(a => { a.pause(); a.currentTime = 0; a.onended = null; }); activeSequence = null; currentStoryAudio = null; setLock(false); setHistoryHomeDisabled(false); updatePlayMonthButton(); updateSkipButtons(); }
function stopVoiceOnly() { allAudios().forEach(a => { a.pause(); a.currentTime = 0; a.onended = null; }); activeSequence = null; currentStoryAudio = null; setLock(false); setHistoryHomeDisabled(false); updatePlayMonthButton(); updateSkipButtons(); }
function stopStoryAudio() { allStoryAudios().forEach(a => { a.pause(); a.currentTime = 0; a.onended = null; }); currentStoryAudio = null; activeSequence = null; setHistoryHomeDisabled(false); updatePlayMonthButton(); updateSkipButtons(); }
function setHistoryHomeDisabled(on) { if(historyHomeBtn) { historyHomeBtn.disabled = !!on; historyHomeBtn.classList.toggle('is-disabled', !!on); } }
function activateSearch() { els.statusText.textContent='Charlotte est prête. Lance une recherche pour trouver le meilleur profil.'; els.searchBtn.disabled=false; els.searchBtn.className='btn btn-primary'; }
function playAudio(a, onEnd, lock=true) {
  stopVoiceOnly();
  if(lock) setLock(true);
  a.currentTime = 0;
  const done = () => { a.removeEventListener('ended', done); if(lock) setLock(false); if(onEnd) onEnd(); };
  a.addEventListener('ended', done);
  const p = a.play();
  if(p && p.catch) p.catch(() => done());
}
function playSectionAudioOnce(key, a, opts={}) {
  if(sectionPlayed[key]) return;
  sectionPlayed[key] = true;
  if(opts.historyMode) {
    audio.sectionHistory.pause(); audio.sectionHistory.currentTime = 0;
    setHistoryHomeDisabled(true);
    a.currentTime = 0;
    const done = () => { a.removeEventListener('ended', done); setHistoryHomeDisabled(false); };
    a.addEventListener('ended', done);
    const p = a.play(); if(p && p.catch) p.catch(() => done());
  } else { playAudio(a, null, true); }
}

function unlockIntroButton() {
  if(!els.acceptIntroBtn) return;
  els.acceptIntroBtn.disabled = false;
  els.acceptIntroBtn.className = 'btn btn-primary big';
}
function updateIntroButton() {
  // V15 : sur iPhone/WebView, le calcul du bas de scroll peut buguer.
  // On garde la consigne lisible, mais le bouton OK reste toujours utilisable.
  unlockIntroButton();
}
if(els.preIntroScroll){
  ['scroll','touchmove','wheel'].forEach(evt => els.preIntroScroll.addEventListener(evt, updateIntroButton, {passive:true}));
}
if(screens.preStart){
  ['scroll','touchmove','wheel'].forEach(evt => screens.preStart.addEventListener(evt, updateIntroButton, {passive:true}));
}
window.addEventListener('resize', updateIntroButton);
window.addEventListener('load', updateIntroButton);
updateIntroButton();
setTimeout(updateIntroButton, 250);
setTimeout(updateIntroButton, 900);
els.acceptIntroBtn?.addEventListener('click',()=>{ unlockIntroButton(); show('start'); });
els.startBtn.addEventListener('click',()=>{ if(locked) return; show('compat'); els.statusText.textContent='Bienvenue sur notre appli de compatibilité amoureuse...'; playAudio(audio.intro, activateSearch); });
const steps=[
  {t:900,n:'Tim',i:'T',r:'Non compatible',pct:9,img:'assets/img/profiles/tim.jpeg'},
  {t:3000,n:'Alexandre',i:'A',r:'Non compatible',pct:4,img:'assets/img/profiles/alexandre.jpeg'},
  {t:5050,n:'Ayton',i:'A',r:'Non compatible',pct:12,img:'assets/img/profiles/ayton.jpeg'},
  {t:7350,n:'Eliott',i:'E',r:'Compatibilité à 100 %',pct:100,img:'assets/img/profiles/eliott.jpeg',final:true}
];
function setProfile(s) {
  els.profileCard.classList.remove('hidden'); els.avatarBox.classList.toggle('final', !!s.final); els.avatarImg.src=s.img; els.avatarInitials.textContent=s.i; els.profileName.textContent=s.n; els.profileResult.textContent=s.r; els.barFill.style.width='0%'; requestAnimationFrame(()=>{ els.barFill.style.width=s.pct+'%'; });
  if(!s.final) { els.profileCard.classList.add('is-shaking'); setTimeout(()=>els.profileCard.classList.remove('is-shaking'),420); }
  else { els.statusText.textContent='Profil parfait trouvé.'; els.checks.classList.remove('hidden'); [...els.checks.children].forEach((c,idx)=>setTimeout(()=>c.classList.add('done'),idx*450)); setTimeout(()=>{ els.profileBtn.classList.remove('hidden'); els.profileBtn.scrollIntoView({behavior:'smooth',block:'center'}); },2300); }
}
els.searchBtn.addEventListener('click',()=>{
  if(locked || els.searchBtn.disabled) return;
  els.searchBtn.disabled=true; els.searchBtn.className='btn btn-disabled'; els.statusText.textContent='Recherche des profils en cours...'; els.profileCard.classList.add('hidden'); els.checks.classList.add('hidden'); els.profileBtn.classList.add('hidden'); [...els.checks.children].forEach(c=>c.classList.remove('done'));
  playAudio(audio.scan, ()=>{ if(els.profileBtn.classList.contains('hidden')) { els.profileBtn.classList.remove('hidden'); els.profileBtn.scrollIntoView({behavior:'smooth',block:'center'}); } });
  steps.forEach(s=>setTimeout(()=>setProfile(s),s.t));
});
els.profileBtn.addEventListener('click',()=>{ if(locked) return; show('chat'); els.envelopeBtn.classList.add('hidden'); els.envelopeBtn.classList.remove('arrive'); playAudio(audio.chat); setTimeout(()=>{ els.envelopeBtn.classList.remove('hidden'); requestAnimationFrame(()=>els.envelopeBtn.classList.add('arrive')); },1000); });
els.envelopeBtn.addEventListener('click',()=>{ if(locked) return; markVisited('letter'); show('letter'); els.homeBtn.classList.add('hidden'); playAudio(audio.letter); setTimeout(()=>screens.letter.scrollTo({top:0,behavior:'auto'}),50); });
screens.letter.addEventListener('scroll',()=>{ const el=screens.letter; if(el.scrollTop+el.clientHeight>=el.scrollHeight-50) els.homeBtn.classList.remove('hidden'); });
els.homeBtn.addEventListener('click',()=>{ if(locked) return; stopAll(); show('home'); });
els.restartBtn.addEventListener('click',()=>{ if(locked) return; stopAll(); show('preStart'); resetCompat(); });
function resetCompat() { els.searchBtn.disabled=true; els.searchBtn.className='btn btn-disabled'; els.profileCard.classList.add('hidden'); els.checks.classList.add('hidden'); els.profileBtn.classList.add('hidden'); els.homeBtn.classList.add('hidden'); }

els.openLetterBtn.addEventListener('click',()=>{ if(locked) return; markVisited('letter'); show('letter'); els.homeBtn.classList.remove('hidden'); setTimeout(()=>screens.letter.scrollTo({top:0,behavior:'auto'}),50); playSectionAudioOnce('letter', audio.sectionLetter); });
els.openPhotosBtn.addEventListener('click',()=>{ if(locked) return; markVisited('photos'); show('photos'); playSectionAudioOnce('photos', audio.sectionPhotos); });
els.openHistoryBtn.addEventListener('click',()=>{ if(locked) return; markVisited('history'); show('history'); renderStory(currentStory || 0); playSectionAudioOnce('history', audio.sectionHistory, {historyMode:true}); });
els.open18Btn.addEventListener('click',()=>{ if(locked || els.open18Btn.disabled) return; startBirthdayMode(); });
document.querySelectorAll('.backHomeBtn').forEach(btn=>btn.addEventListener('click',()=>{ if(locked || btn.disabled) return; stopAll(); show('home'); }));

function renderGallery() {
  els.photoGrid.innerHTML = gallery.map((g,i)=>`<button class="photo-tile" data-index="${i}"><img src="${g.src}" alt="${escapeHtml(g.title)}"><span>${i+1}</span></button>`).join('');
  els.photoGrid.querySelectorAll('.photo-tile').forEach(btn=>btn.addEventListener('click',()=>openPhoto(Number(btn.dataset.index))));
}
function openPhoto(i) { if(locked) return; const g=gallery[i]; els.detailImg.src=g.src; els.detailCounter.textContent=`Souvenir ${i+1} / ${gallery.length}`; els.detailTitle.textContent=g.title; els.detailDesc.textContent=g.desc; show('photoDetail'); }
els.backPhotosBtn.addEventListener('click',()=>{ if(locked) return; show('photos'); });

function paragraphHtml(txt) { return txt.split(/\n\s*\n/g).map(p=>`<p>${escapeHtml(p)}</p>`).join(''); }
function renderStory(index) {
  currentStory = Math.max(0, Math.min(storyPages.length-1, index));
  const p = storyPages[currentStory];
  els.storyMonth.textContent = p.month;
  els.storyTitle.textContent = p.title;
  els.storyText.innerHTML = paragraphHtml(p.text);
  els.pageIndicator.textContent = `${currentStory+1} / ${storyPages.length}`;
  els.prevPageBtn.disabled = currentStory === 0;
  els.nextPageBtn.disabled = currentStory === storyPages.length-1;
  updatePlayMonthButton(); updateSkipButtons();
  const paper = document.querySelector('.page-paper'); paper.style.animation='none'; paper.offsetHeight; paper.style.animation='pageOpen .7s ease both';
}
els.prevPageBtn.addEventListener('click',()=>{ if(locked) return; renderStory(currentStory-1); });
els.nextPageBtn.addEventListener('click',()=>{ if(locked) return; renderStory(currentStory+1); });
els.playMonthBtn.addEventListener('click',()=>{ if(locked) return; if(activeSequence){ stopStoryAudio(); return; } playCurrentMonth(); });
els.skipBackBtn.addEventListener('click',()=>{ if(locked) return; skipStory(-1); });
els.skipNextBtn.addEventListener('click',()=>{ if(locked) return; skipStory(1); });
function updatePlayMonthButton() {
  if(!els.playMonthBtn || !storyPages[currentStory]) return;
  if(activeSequence) els.playMonthBtn.textContent = '⏸ Arrêter la lecture';
  else els.playMonthBtn.textContent = `▶ Lire ${storyPages[currentStory].month}`;
}
function updateSkipButtons() {
  const showSkips = !!activeSequence;
  els.skipBackBtn.classList.toggle('hidden', !showSkips);
  els.skipNextBtn.classList.toggle('hidden', !showSkips);
  if(activeSequence) {
    els.skipBackBtn.disabled = currentStory <= 0;
    els.skipNextBtn.disabled = currentStory >= storyPages.length - 1;
  }
}
function playCurrentMonth() {
  audio.sectionHistory.pause(); audio.sectionHistory.currentTime = 0;
  setLock(false);
  setHistoryHomeDisabled(true);
  const month = storyPages[currentStory].month;
  const monthIndices = storyPages.map((p,i)=>p.month===month?i:null).filter(i=>i!==null);
  const startPos = Math.max(0, monthIndices.indexOf(currentStory));
  activeSequence = {month, pos: currentStory, indices: storyPages.map((_,i)=>i), monthEnd: monthIndices[monthIndices.length-1]};
  updatePlayMonthButton(); updateSkipButtons();
  playStoryIndex(monthIndices[startPos]);
}
function playStoryIndex(pageIndex) {
  if(!activeSequence) return;
  allStoryAudios().forEach(a => { a.pause(); a.currentTime = 0; a.onended = null; });
  renderStory(pageIndex);
  const a = audio[storyPages[pageIndex].audioKey];
  currentStoryAudio = a;
  if(!a) { finishStorySequence(); return; }
  a.currentTime = 0;
  a.onended = () => {
    if(!activeSequence) return;
    activeSequence.pos = pageIndex + 1;
    if(activeSequence.pos <= activeSequence.monthEnd && activeSequence.pos < storyPages.length) playStoryIndex(activeSequence.pos);
    else finishStorySequence();
  };
  const p = a.play();
  if(p && p.catch) p.catch(()=>finishStorySequence());
}
function skipStory(direction) {
  if(!activeSequence) return;
  const nextIndex = currentStory + direction;
  if(nextIndex < 0 || nextIndex >= storyPages.length) return;
  activeSequence.pos = nextIndex;
  activeSequence.month = storyPages[nextIndex].month;
  const monthIndices = storyPages.map((p,i)=>p.month===activeSequence.month?i:null).filter(i=>i!==null);
  activeSequence.monthEnd = monthIndices[monthIndices.length-1];
  playStoryIndex(nextIndex);
}
function finishStorySequence() {
  allStoryAudios().forEach(a => { a.pause(); a.currentTime = 0; a.onended = null; });
  currentStoryAudio = null;
  activeSequence = null;
  setHistoryHomeDisabled(false);
  updatePlayMonthButton(); updateSkipButtons();
}


const foundCats = new Set();
function setupCatHunt(){
  document.querySelectorAll('.hidden-cat').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const id = btn.dataset.cat || Math.random().toString(36);
      if(foundCats.has(id)) return;
      foundCats.add(id);
      btn.classList.add('cat-found');
      if(foundCats.size >= 5){
        els.catReward?.classList.remove('hidden');
      }
    });
  });
  els.closeCatReward?.addEventListener('click',()=>els.catReward?.classList.add('hidden'));
}


// ===== Mode 18 ans =====
const birthdayStages = () => document.querySelectorAll('#birthdayScreen .birthday-stage');
let selectedRating = 0;
let bodyCount = Number(localStorage.getItem('annaBodyCount') || '130');
let currentJarvisAudio = null;
const playedJarvisSections = new Set();

function showBirthdayStage(stage) {
  birthdayStages().forEach(el => el.classList.toggle('active', el.dataset.birthdayStage === stage));
  requestAnimationFrame(()=>{
    if(screens.birthday) screens.birthday.scrollTo({top:0, behavior:'auto'});
    const activeStage = document.querySelector('#birthdayScreen .birthday-stage.active');
    if(activeStage) activeStage.scrollIntoView({block:'start', behavior:'auto'});
  });
}

function showJarvisLock(show=true){
  if(els.jarvisLock) els.jarvisLock.classList.toggle('hidden', !show);
}

function playJarvisAudio(a, after){
  if(!a){ if(typeof after === 'function') after(); return; }
  try{
    if(currentJarvisAudio && currentJarvisAudio !== a){ currentJarvisAudio.pause(); currentJarvisAudio.currentTime = 0; }
    currentJarvisAudio = a;
    showJarvisLock(true);
    a.pause();
    a.currentTime = 0;
    a.onended = () => { showJarvisLock(false); currentJarvisAudio = null; if(typeof after === 'function') after(); };
    a.onerror = () => { showJarvisLock(false); currentJarvisAudio = null; if(typeof after === 'function') after(); };
    const p = a.play();
    if(p && p.catch) p.catch(()=>{ showJarvisLock(false); currentJarvisAudio = null; if(typeof after === 'function') after(); });
  }catch(e){ showJarvisLock(false); currentJarvisAudio = null; if(typeof after === 'function') after(); }
}

function stopJarvis(){
  if(currentJarvisAudio){
    try{ currentJarvisAudio.pause(); currentJarvisAudio.currentTime = 0; }catch(e){}
  }
  currentJarvisAudio = null;
  showJarvisLock(false);
}


function getPartyVolume(){
  const stored = Number(localStorage.getItem('annaPartyVolume'));
  if(Number.isFinite(stored)) return Math.max(0, Math.min(1, stored));
  return 0.16;
}

function setPartyVolume(v){
  const safe = Math.max(0, Math.min(1, Number(v)));
  localStorage.setItem('annaPartyVolume', String(safe));
  if(audio.partyBg) audio.partyBg.volume = safe;
  const volumeRange = document.getElementById('partyVolumeRange');
  const volumeValue = document.getElementById('partyVolumeValue');
  if(volumeRange) volumeRange.value = String(Math.round(safe * 100));
  if(volumeValue) volumeValue.textContent = Math.round(safe * 100) + '%';
  return safe;
}

function startPartyBg(){
  if(!audio.partyBg) return;
  try{
    audio.partyBg.volume = getPartyVolume();
    audio.partyBg.loop = true;
    const p = audio.partyBg.play();
    if(p && p.catch) p.catch(()=>{});
  }catch(e){}
}

function stopPartyBg(){
  if(!audio.partyBg) return;
  try{ audio.partyBg.pause(); audio.partyBg.currentTime = 0; }catch(e){}
}

function startBirthdayMode() {
  stopAll();
  stopPartyBg();
  show('birthday');
  showBirthdayStage('door');
  playJarvisAudio(audio.bouncer);
}

function playLooseAudio(a) {
  if(!a) return;
  try {
    a.pause();
    a.currentTime = 0;
    const p = a.play();
    if(p && p.catch) p.catch(()=>{});
  } catch(e) {}
}

function updateBodyCount(){
  const el = document.getElementById('bodyCountValue');
  if(el) el.textContent = String(bodyCount);
  localStorage.setItem('annaBodyCount', String(bodyCount));
}

function resetRatingBox(){
  selectedRating = 0;
  const box = document.getElementById('ratingBox');
  const comment = document.getElementById('ratingComment');
  if(box) box.classList.add('hidden');
  if(comment) comment.value = '';
  document.querySelectorAll('#starRow button').forEach(b => b.classList.remove('selected'));
}

function setupBirthdayMode(){
  updateBodyCount();
  document.getElementById('showIdBtn')?.addEventListener('click',()=>{
    showBirthdayStage('contract');
    playJarvisAudio(audio.clubIntro);
  });
  document.querySelector('.birthdayBackDoorBtn')?.addEventListener('click',()=>{
    showBirthdayStage('door');
    playJarvisAudio(audio.bouncer);
  });
  document.getElementById('oldCheck')?.addEventListener('change',(e)=>{
    const btn = document.getElementById('enter18Btn');
    if(btn) btn.disabled = !e.target.checked;
  });
  document.getElementById('enter18Btn')?.addEventListener('click',()=>{
    if(document.getElementById('enter18Btn').disabled) return;
    showBirthdayStage('home');
    startPartyBg();
  });
  const jarvisBySection = {
    legal: audio.jarvisLegal,
    photos: audio.jarvisPhotos,
    bodycount: audio.jarvisBodycount,
    spotify: audio.jarvisSpotify
  };
  document.querySelectorAll('[data-18-section]').forEach(btn=>btn.addEventListener('click',()=>{
    const stage = btn.dataset['18Section'];
    showBirthdayStage(stage);
    // Jarvis parle seulement une fois par onglet et seulement une fois que la page est ouverte.
    if(!playedJarvisSections.has(stage)){
      playedJarvisSections.add(stage);
      setTimeout(()=>playJarvisAudio(jarvisBySection[stage]), 220);
    }
  }));
  const volumeRange = document.getElementById('partyVolumeRange');
  if(volumeRange){
    setPartyVolume(getPartyVolume());
    volumeRange.addEventListener('input',()=>{
      setPartyVolume(Number(volumeRange.value) / 100);
      // Sur certains téléphones, le volume ne s'applique qu'après un petit resume/play.
      if(audio.partyBg && !audio.partyBg.paused){
        const p = audio.partyBg.play();
        if(p && p.catch) p.catch(()=>{});
      }
    });
    volumeRange.addEventListener('change',()=>setPartyVolume(Number(volumeRange.value) / 100));
  }
  document.querySelectorAll('.birthdayHome18Btn').forEach(btn=>btn.addEventListener('click',()=>showBirthdayStage('home')));
  document.querySelectorAll('.birthdayExitBtn').forEach(btn=>btn.addEventListener('click',()=>{
    stopJarvis();
    stopPartyBg();
    stopAll();
    show('home');
  }));
  document.getElementById('addBodyBtn')?.addEventListener('click',()=>{
    const box = document.getElementById('ratingBox');
    if(box) box.classList.remove('hidden');
  });
  document.querySelectorAll('#starRow button').forEach(btn=>btn.addEventListener('click',()=>{
    selectedRating = Number(btn.dataset.star || '0');
    document.querySelectorAll('#starRow button').forEach(b => b.classList.toggle('selected', Number(b.dataset.star) <= selectedRating));
  }));
  document.getElementById('submitRatingBtn')?.addEventListener('click',()=>{
    bodyCount += 1;
    updateBodyCount();
    resetRatingBox();
  });
}

window.addEventListener('beforeunload', ()=>{ stopAll(); stopJarvis(); stopPartyBg(); });
renderLetter();
renderGallery();
renderStory(0);
update18Button();
setupBirthdayMode();
