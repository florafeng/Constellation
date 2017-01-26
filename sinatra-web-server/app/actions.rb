# Homepage (Root path)

get '/' do
  @args = {
    db: 'd2tjg1p6301ri2',
    user: 'haqgjczsewuoim',
    password: 'Oygd5GBvgRmlfrlOcWQwUvgYkC',
    host: 'ec2-23-21-100-145.compute-1.amazonaws.com',
    port: 5432,
    ssl: true
  }
  erb :index
end

post '/' do
  @args = {
    db: params[:db],
    user: params[:user],
    password: params[:password],
    host: params[:host],
    port: params[:port],
    ssl: true
  }
  erb :index
end
