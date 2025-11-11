while true
do
git add .
git commit -m "auto update $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main
sleep 60 # har 1 minute baad push karega
done